(() => {
  'use strict';
  const root = document.documentElement;
  const intro = document.querySelector('.brand-intro');
  if (!intro || !root.classList.contains('intro-pending')) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const skip = intro.querySelector('.intro-skip');
  const previousFocus = document.activeElement;
  const siblings = [...document.body.children].filter(node => node !== intro);
  const priorInert = siblings.map(node => node.inert);
  let closing = false, finished = false;
  let autoTimer, exitTimer, failsafeTimer;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(autoTimer); clearTimeout(exitTimer); clearTimeout(failsafeTimer);
    siblings.forEach((node, i) => { node.inert = priorInert[i]; });
    root.classList.remove('intro-pending', 'intro-leaving');
    intro.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKey);
    preference.removeEventListener('change', onPreference);
    if (intro.contains(document.activeElement)) {
      const target = previousFocus && previousFocus !== document.body ? previousFocus : document.querySelector('header .wordmark');
      target?.focus({ preventScroll: true });
    }
    document.dispatchEvent(new Event('bloom:intro-complete'));
  }
  function close(immediate = false) {
    if (finished) return;
    if (immediate) return finish();
    if (closing) return;
    closing = true;
    root.classList.add('intro-leaving');
    exitTimer = setTimeout(finish, 950);
  }
  function onKey(event) {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
  }
  function onPreference(event) { if (event.matches) close(true); }
  // Every page load gets the intro: no session/local-storage suppression.
  siblings.forEach(node => { node.inert = true; });
  skip.focus({ preventScroll: true });
  skip.addEventListener('click', () => close(true));
  document.addEventListener('keydown', onKey);
  preference.addEventListener('change', onPreference);
  autoTimer = setTimeout(() => close(), 2300);
  failsafeTimer = setTimeout(finish, 4500);
})();
