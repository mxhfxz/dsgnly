(function () {
  const container = document.getElementById('wf-bgvid');
  const video = document.getElementById('wf-bgvid-el');
  if (!container || !video) return;

  // Try to play when possible (iOS/Safari quirks)
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Fallback: wait for a user gesture once
        const once = () => {
          video.play().catch(() => {});
          window.removeEventListener('touchend', once, { passive: true });
          window.removeEventListener('click', once);
        };
        window.addEventListener('touchend', once, { passive: true, once: true });
        window.addEventListener('click', once, { once: true });
      });
    }
  };

  // Kick off playback when visible; pause when tab hidden
  const onVis = () => (document.visibilityState === 'visible' ? tryPlay() : video.pause());
  document.addEventListener('visibilitychange', onVis);

  // Start when metadata is ready
  video.addEventListener('loadedmetadata', tryPlay, { once: true });

  // If user prefers reduced motion, pause the video
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleRM = () => {
    if (reduceMotion.matches) {
      video.pause();
      container.style.display = 'none';
    } else {
      container.style.display = '';
      tryPlay();
    }
  };
  reduceMotion.addEventListener?.('change', handleRM);
  handleRM();

  // Optional: if you want a slight dark overlay for readability, uncomment below:
  /*
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.25);z-index:-1;pointer-events:none;';
  document.body.appendChild(overlay);
  */
})();
