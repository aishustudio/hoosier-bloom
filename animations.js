(() => {
  'use strict';
  const tabs = [...document.querySelectorAll('[data-category]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  const tablist = document.querySelector('.menu-tabs');
  // Progressive enhancement: all menu sections remain readable without JS.
  if (tablist && tabs.length === panels.length) {
    tablist.setAttribute('role', 'tablist');
    tabs.forEach(tab => {
      const key = tab.dataset.category;
      tab.id = `tab-${key}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `panel-${key}`);
      const panel = panels.find(p => p.dataset.panel === key);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
    });
    function select(key, focus = false) {
      tabs.forEach(tab => {
        const active = tab.dataset.category === key;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      panels.forEach(panel => {
        panel.hidden = panel.dataset.panel !== key;
        panel.classList.toggle('entering', !panel.hidden);
      });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab.dataset.category));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[next].dataset.category, true);
      });
    });
    select('coffee');
  }
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  function startReveals() {
    if (started || preference.matches || !('IntersectionObserver' in window)) return;
    started = true;
    const elements = document.querySelectorAll('.section-intro, .feature-art, .feature-copy, .story-heading, .story-copy, .family-photo, .visit > div, .footer-top');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
    document.addEventListener('focusin', event => {
      event.target.closest('.reveal')?.classList.add('is-visible');
    });
    preference.addEventListener('change', event => {
      if (event.matches) {
        observer.disconnect();
        elements.forEach(element => element.classList.add('is-visible'));
      }
    });
  }
  if (document.documentElement.classList.contains('intro-pending')) {
    document.addEventListener('bloom:intro-complete', startReveals, { once: true });
    // If intro.js fails to load, the bootstrap still releases the page.
    window.setTimeout(startReveals, 5600);
  } else startReveals();
})();
