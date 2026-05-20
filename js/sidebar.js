// js/sidebar.js  –  Sidebar toggle and submenu accordion

export function initSidebar() {
  const body           = document.body;
  const sidebarToggle  = document.getElementById('sidebarToggle');   // inside sidebar
  const hamburgerBtn   = document.getElementById('hamburgerBtn');     // in header

  // ── Desktop: collapse / expand sidebar ──
  function toggleCollapse() {
    body.classList.toggle('sidebar-collapsed');
  }

  sidebarToggle?.addEventListener('click', toggleCollapse);
  hamburgerBtn?.addEventListener('click', () => {
    // On mobile → open/close overlay; on desktop → collapse
    if (window.innerWidth <= 768) {
      body.classList.toggle('sidebar-open');
    } else {
      toggleCollapse();
    }
  });

  // ── Mobile: overlay click closes sidebar ──
  const overlay = document.querySelector('.sidebar-overlay');
  overlay?.addEventListener('click', () => body.classList.remove('sidebar-open'));

  // ── Submenu accordion ──
  const hasSubmenu = document.querySelectorAll('.nav-item.has-submenu > .nav-link');

  hasSubmenu.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const item = link.closest('.nav-item');

      // Close other open items (accordion behaviour)
      document.querySelectorAll('.nav-item.has-submenu.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open');
    });
  });
}
