const root = document.documentElement;
const buttons = [...document.querySelectorAll('[data-mode]')];
const modeLabel = document.querySelector('#preview-mode');
const modeNote = document.querySelector('#mode-note');
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
const savedMode = localStorage.getItem('lightdark-mode');
let mode = ['light', 'dark', 'system'].includes(savedMode) ? savedMode : 'system';

function renderTheme() {
  const isDark = mode === 'dark' || (mode === 'system' && systemPreference.matches);
  root.dataset.theme = isDark ? 'dark' : 'light';
  modeLabel.textContent = `${isDark ? 'DARK' : 'LIGHT'} MODE${mode === 'system' ? ' · SYSTEM' : ''}`;
  modeNote.textContent = mode === 'system'
    ? 'Follows your device setting. Your choice is saved on this device.'
    : 'Your appearance is saved on this device.';
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    mode = button.dataset.mode;
    localStorage.setItem('lightdark-mode', mode);
    renderTheme();
  });
});

systemPreference.addEventListener('change', () => {
  if (mode === 'system') renderTheme();
});

renderTheme();
