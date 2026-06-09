'use strict';

(function () {
  const selectableInputTypes = new Set([
    'text',
    'search',
    'url',
    'tel',
    'email',
    'password',
    'number',
  ]);

  function shouldSelectText(el) {
    if (!el || el.disabled || el.readOnly) return false;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName !== 'INPUT') return false;

    const type = (el.getAttribute('type') || 'text').toLowerCase();
    return selectableInputTypes.has(type);
  }

  document.addEventListener('focusin', (event) => {
    const el = event.target;

    if (!shouldSelectText(el)) return;

    requestAnimationFrame(() => {
      try {
        el.select();
      } catch (_) {
        // Some input types do not support select(); safely ignore.
      }
    });
  });
})();
