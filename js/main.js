// Language Toggle
const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;

    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    document.title = lang === 'es'
        ? 'TRF | The Resources Firm - Consultoría Legal y Financiera'
        : 'TRF | The Resources Firm - Legal & Financial Consulting';

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.innerHTML = text;
        }
    });
}

langToggle.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-option');
    if (option) {
        switchLanguage(option.dataset.lang);
    }
});

// Navbar scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight;
            const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    });
});

// Modals
const modalOverlay = document.getElementById('modalOverlay');

document.querySelectorAll('.service-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modalOverlay.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            modal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .why-item, .timeline-item, .protocol-card, .dataroom, .contact-box, .marco, .editorial-content, .vision-content').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
});
