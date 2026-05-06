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
        ? 'TRF | Servicios Especializados'
        : 'TRF | Specialized Services';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-es]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerHTML = text;
    });
}

langToggle.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-option');
    if (option) switchLanguage(option.dataset.lang);
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

// Tabs
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});

// Check URL hash for tab
const hash = window.location.hash.replace('#', '');
if (hash && document.querySelector(`[data-tab="${hash}"]`)) {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    document.querySelector(`[data-tab="${hash}"]`).classList.add('active');
    document.getElementById('tab-' + hash).classList.add('active');
}
