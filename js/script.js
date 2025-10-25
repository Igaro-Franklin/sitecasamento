/* script.js - controle do menu hambúrguer e cronômetro até 19/02 (próximo) */
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  const targetInfo = document.getElementById('target-info');

  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.close-menu');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // fechar menu ao clicar em link
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Data alvo fixa: 19 de dezembro de 2026 às 18:00 (mês 11 = dezembro)
  const TARGET = new Date(2026, 11, 19, 18, 0, 0, 0);

  function updateTargetInfo(){
    targetInfo.textContent = 'Data alvo: 19/12/2026 18:00';
  }

  function updateCountdown(){
    const now = new Date();
    const target = TARGET;

    if (now >= target) {
      // evento já ocorreu ou é momento — exibir zeros
      document.getElementById('years').textContent = 0;
      document.getElementById('months').textContent = 0;
      document.getElementById('days').textContent = 0;
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    // componentes atuais
    let y1 = now.getFullYear(), m1 = now.getMonth() + 1, d1 = now.getDate();
    let h1 = now.getHours(), min1 = now.getMinutes(), s1 = now.getSeconds();

    let y2 = target.getFullYear(), m2 = target.getMonth() + 1, d2 = target.getDate();
    let h2 = target.getHours(), min2 = target.getMinutes(), s2 = target.getSeconds();

    let years = y2 - y1;
    let months = m2 - m1;
    let days = d2 - d1;
    let hours = h2 - h1;
    let minutes = min2 - min1;
    let seconds = s2 - s1;

    if (seconds < 0) { minutes--; seconds += 60; }
    if (minutes < 0) { hours--; minutes += 60; }
    if (hours < 0) { days--; hours += 24; }

    if (days < 0) {
      // dias no mês anterior ao mês do target
      const daysInPrevMonth = new Date(y2, m2 - 1, 0).getDate();
      days += daysInPrevMonth;
      months--;
    }

    if (months < 0) { months += 12; years--; }
    if (years < 0) years = 0;

    // Atualizar DOM
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
  }

  // inicializar
  updateTargetInfo();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
