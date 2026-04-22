(function () {
  const HOLD_MS = 2500;
  const ANIM_MS = 200;
  const REDUCED_INTERVAL_MS = 3000;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initSpan(span) {
    const raw = span.getAttribute('data-cycling-words');
    if (!raw) return;

    const words = raw.split(',').map((w) => w.trim()).filter(Boolean);
    if (words.length < 2) return;

    // Preserve original text for SEO; start visual cycle from first word
    span.textContent = words[0];

    // Inline styles needed for the transform-based fade
    span.style.display = 'inline-block';
    span.style.transition = '';

    let index = 0;
    let timer = null;
    let destroyed = false;

    function swap() {
      if (destroyed || !span.isConnected) {
        clearTimeout(timer);
        destroyed = true;
        return;
      }

      index = (index + 1) % words.length;

      if (reduceMotion.matches) {
        span.textContent = words[index];
        timer = setTimeout(swap, REDUCED_INTERVAL_MS);
        return;
      }

      // Fade out
      span.style.transition = `opacity ${ANIM_MS}ms ease-in, transform ${ANIM_MS}ms ease-in`;
      span.style.opacity = '0';
      span.style.transform = 'translateY(-8px)';

      setTimeout(() => {
        if (destroyed || !span.isConnected) return;

        span.textContent = words[index];

        // Reset without transition so the starting state is invisible
        span.style.transition = '';
        span.style.opacity = '0';
        span.style.transform = 'translateY(8px)';

        // Force reflow so the browser registers the reset before we transition in
        void span.offsetHeight;

        // Fade in
        span.style.transition = `opacity ${ANIM_MS}ms ease-out, transform ${ANIM_MS}ms ease-out`;
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';

        timer = setTimeout(swap, HOLD_MS);
      }, ANIM_MS);
    }

    timer = setTimeout(swap, HOLD_MS);
  }

  function init() {
    document.querySelectorAll('[data-cycling-words]').forEach(initSpan);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
