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
    document.body.style.transition = 'color 1s';
    document.body.style.transition = 'background-color 1s'
  });
});
