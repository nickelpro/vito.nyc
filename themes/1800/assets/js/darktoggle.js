function darkToggle() {
  const dark = document.body.classList.contains('dark-mode');
  if (dark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'false');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true');
  }
}
