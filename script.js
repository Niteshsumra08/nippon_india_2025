/* script.js - shared scripts for navigation and financial logic */

/* --- Highlight active nav link --- */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    // normalize
    if (href.endsWith(path) || (href === '#' && path === 'index.html')) {
      a.classList.add('active');
    }
  });
});

/* --- duration slider handler used on dashboard --- */
(function(){
  const rangeInput = document.querySelector('input[type="range"]');
  const rangeValueSpan = document.querySelector('.planner-inputs span');

  if (rangeInput && rangeValueSpan) {
    rangeInput.addEventListener('input', () => {
      rangeValueSpan.textContent = `${rangeInput.value} Year${rangeInput.value > 1 ? 's' : ''}`;
    });
  }
})();

/* --- Financial planner calc --- */
(function(){
  const calcBtn = document.getElementById('calculateBtn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const amountInput = document.querySelector('input[placeholder="₹ 100"]');
    const durationInput = document.querySelector('input[type="range"]');
    const returnsInput = document.querySelector('input[placeholder="8%"]');
    const resultP = document.getElementById('result');

    const amount = amountInput ? parseFloat(amountInput.value) : NaN;
    const duration = durationInput ? parseInt(durationInput.value) : NaN;
    const returnsVal = returnsInput ? parseFloat(returnsInput.value) : NaN;

    if (isNaN(amount) || isNaN(duration) || isNaN(returnsVal) || amount <= 0){
      if (resultP) resultP.textContent = "⚠️ Please fill all fields correctly.";
      return;
    }

    const monthlyRate = returnsVal / 100 / 12;
    const months = duration * 12;
    const maturity = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    if (resultP) resultP.textContent = `💰 Expected Maturity Value after ${duration} year(s): ₹ ${maturity.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  });
})();
