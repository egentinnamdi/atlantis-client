// js/charts.js  –  Chart.js initialisation for dashboard charts

export function initCharts() {
  _initRecoveredChart();
  _initVisitorsChart();
}

// ── Recovered (grouped bar chart) ──
function _initRecoveredChart() {
  const ctx = document.getElementById('recoveredChart');
  if (!ctx) return;

  const isDark = () => document.body.dataset.theme === 'dark';
  const labelColor = () => isDark() ? '#8899aa' : '#787878';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const newCases       = [75, 150, 225, 200, 100, 80, 120];
  const recoveredCases = [40,  90, 130, 160,  60, 50,  95];

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Recovered',
          data: recoveredCases,
          backgroundColor: 'rgba(32,159,132,0.85)',
          borderRadius: 5,
          barThickness: 10,
        },
        {
          label: 'New',
          data: newCases,
          backgroundColor: 'rgba(238,50,50,0.80)',
          borderRadius: 5,
          barThickness: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: {
          stacked: false,
          grid: { display: false },
          ticks: {
            color: labelColor(),
            font: { family: 'Poppins', size: 12 },
          },
          border: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });

  // Re-color on theme change
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    chart.options.scales.x.ticks.color = labelColor();
    chart.update();
  });
}

// ── Visitors (area line chart) ──
function _initVisitorsChart() {
  const ctx = document.getElementById('visitorsChart');
  if (!ctx) return;

  const isDark = () => document.body.dataset.theme === 'dark';
  const labelColor = () => isDark() ? '#8899aa' : '#787878';

  const months = ['Feb','Feb','Mar','Mar','Apr','Apr','May','May','Jun','Jun','Jul'];
  const visitors = [120, 180, 250, 310, 400, 480, 600, 520, 380, 420, 350];

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Visitors',
          data: visitors,
          borderColor: '#5c1f8e',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 220);
            gradient.addColorStop(0, 'rgba(123,47,190,0.35)');
            gradient.addColorStop(1, 'rgba(123,47,190,0.02)');
            return gradient;
          },
          tension: 0.45,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: labelColor(),
            font: { family: 'Poppins', size: 11 },
            maxRotation: 0,
          },
          border: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    chart.options.scales.x.ticks.color = labelColor();
    chart.update();
  });
}
