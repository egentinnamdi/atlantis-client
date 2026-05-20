// js/header.js  –  Theme toggle, fullscreen

export function initHeader() {
  _initThemeToggle();
  _initFullscreen();
}

// ── Dark / Light theme ──
function _initThemeToggle() {
  const btn  = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  const body = document.body;

  // Restore saved preference
  const saved = localStorage.getItem('mediqu_theme') || 'light';
  _applyTheme(saved, icon);

  btn?.addEventListener('click', () => {
    const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
    _applyTheme(next, icon);
    localStorage.setItem('mediqu_theme', next);
  });
}

function _applyTheme(theme, icon) {
  document.body.dataset.theme = theme;
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ── Fullscreen ──
function _initFullscreen() {
  const btn = document.getElementById('fullscreenBtn');

  btn?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      btn.querySelector('i').className = 'fas fa-compress';
    } else {
      document.exitFullscreen?.();
      btn.querySelector('i').className = 'fas fa-expand';
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && btn) {
      btn.querySelector('i').className = 'fas fa-expand';
    }
  });
}
