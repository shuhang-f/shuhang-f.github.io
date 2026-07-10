'use strict';

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setMenu = (open) => {
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
};

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
}, { passive: true });

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
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
