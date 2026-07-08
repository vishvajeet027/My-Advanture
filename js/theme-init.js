/* Apply saved theme before first paint to prevent light-theme flash */
(function () {
  var THEME_KEY = 'myAdventureTheme';
  var theme = 'light';

  try {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored) theme = JSON.parse(stored);
  } catch (e) {}

  if (theme !== 'dark') return;

  document.documentElement.setAttribute('data-theme', 'dark');

  var style = document.createElement('style');
  style.id = 'theme-critical';
  style.textContent =
    'html[data-theme="dark"],html[data-theme="dark"] body{background:#1e2130;color:#ccc;color-scheme:dark}';
  (document.head || document.documentElement).appendChild(style);
})();
