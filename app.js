'use strict';

const themeInputs = document.querySelectorAll('input[name="theme"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const preferenceKey = 'ayman_portal_theme';
let preference = 'system';

try {
  const stored = localStorage.getItem(preferenceKey);
  if (['system', 'light', 'dark'].includes(stored)) preference = stored;
} catch {
  // Theme selection still works when browser storage is unavailable.
}

function renderTheme() {
  const resolved = preference === 'system'
    ? (systemTheme.matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.theme = resolved;
  themeInputs.forEach(input => {
    input.checked = input.value === preference;
  });
}

themeInputs.forEach(input => {
  input.addEventListener('change', () => {
    preference = input.value;
    try {
      localStorage.setItem(preferenceKey, preference);
    } catch {
      // Keep the selection for this session.
    }
    renderTheme();
  });
});
systemTheme.addEventListener('change', renderTheme);
document.getElementById('portal-form').addEventListener('submit', event => {
  event.preventDefault();
  window.location.href = document.getElementById('destination').value === 'writing' ? 'library.html#writing' : 'library.html#dashboard';
});
renderTheme();
