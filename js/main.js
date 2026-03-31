// Language Toggle
const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;

    // Update active state on toggle
    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Update page title
    document.title = lang === 'es'
        ? 'LegalPro Consultores | Consultoría Legal y Financiera'
        : 'LegalPro Consultores | Legal & Financial Consulting';

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update all translatable elements
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                // For form elements, don't change text content
            } else {
                el.textContent = text;
            }
        }
    });

    // Update placeholders
    document.querySelectorAll(`[data-${lang}-placeholder]`).forEach(el => {
        el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });

    // Update select options
    document.querySelectorAll('select option[data-es]').forEach(opt => {
        const text = opt.getAttribute(`data-${lang}`);
        if (text) opt.textContent = text;
    });

    // Update labels
    document.querySelectorAll('label[data-es]').forEach(label => {
        const text = label.getAttribute(`data-${lang}`);
        if (text) label.textContent = text;
    });
}

langToggle.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-option');
    if (option) {
        switchLanguage(option.dataset.lang);
    }
});

// Navbar scroll behavior
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .service-featured, .value-card, .team-card, .about-grid, .ethics-grid, .contact-grid').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = currentLang === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!';
        btn.classList.add('success');
        this.reset();
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.classList.remove('success');
        }, 3000);
    }, 1500);
});
