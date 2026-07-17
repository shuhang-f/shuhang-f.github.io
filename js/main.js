'use strict';

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktopQuery = window.matchMedia('(min-width: 721px)');

document.addEventListener('keydown', () => {
  document.documentElement.classList.add('keyboard-input');
}, { capture: true });

document.addEventListener('pointerdown', () => {
  document.documentElement.classList.remove('keyboard-input');
}, { capture: true });

const setMenu = (open, { immediate = false } = {}) => {
  if (immediate) navLinks.classList.add('is-instant');
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? 'Close' : 'Menu';

  if (immediate) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => navLinks.classList.remove('is-instant'));
    });
  }
};

menuToggle.addEventListener('click', (event) => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true', { immediate: event.detail === 0 });
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false, { immediate: event.detail === 0 });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false, { immediate: true });
});

document.addEventListener('click', (event) => {
  if (menuToggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('.nav-shell')) {
    setMenu(false);
  }
});

const handleViewportChange = (event) => {
  if (event.matches) setMenu(false, { immediate: true });
};

if ('addEventListener' in desktopQuery) {
  desktopQuery.addEventListener('change', handleViewportChange);
} else {
  desktopQuery.addListener(handleViewportChange);
}

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

  reveals.forEach((element) => revealObserver.observe(element));
}

document.getElementById('year').textContent = String(new Date().getFullYear());
