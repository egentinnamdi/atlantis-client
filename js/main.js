// js/main.js  –  App entry point
import { initSidebar }   from './sidebar.js';
import { initHeader }    from './header.js';
import { initCharts }    from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initHeader();
  initCharts();
});
