window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.getItem('dark-mode');
  if (dark == null) {
    localStorage.setItem('dark-mode', 'false');
  } else if (dark === 'true') {
    document.body.classList.add('dark-mode');
  }
  document.body.style.visibility = 'visible';
  document.body.style.opacity = 1;
  window.requestAnimationFrame(() => {
    document.body.style.transition = 'all 1s';
  });
});
