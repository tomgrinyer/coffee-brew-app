document.addEventListener('DOMContentLoaded', () => {
  //
  // COFFEE <--> WATER CALCULATOR
  //
  const coffeeInput = document.getElementById('coffee-input');
  const waterInput = document.getElementById('water-input');

  const bloomAmount = document.getElementById('bloom-amount');
  const pour1Amount = document.getElementById('pour1-amount');
  const pour2Amount = document.getElementById('pour2-amount');

  const waterPerCoffee = 1000 / 60;

  function updateWaterBreakdown(totalWater) {
    if (!isNaN(totalWater) && totalWater > 0) {
      const bloom = totalWater * 0.12;
      const pour1 = totalWater * 0.48;
      const pour2 = totalWater * 0.40;

      bloomAmount.textContent = bloom.toFixed(1);
      pour1Amount.textContent = pour1.toFixed(1);
      pour2Amount.textContent = pour2.toFixed(1);
    } else {
      bloomAmount.textContent = 0;
      pour1Amount.textContent = 0;
      pour2Amount.textContent = 0;
    }
  }

  coffeeInput.addEventListener('input', () => {
    if (document.activeElement === coffeeInput) {
      const coffeeVal = parseFloat(coffeeInput.value);
      if (!isNaN(coffeeVal) && coffeeVal > 0) {
        const calculatedWater = coffeeVal * waterPerCoffee;
        waterInput.value = calculatedWater.toFixed(1);
        updateWaterBreakdown(calculatedWater);
      } else {
        waterInput.value = '';
        updateWaterBreakdown(NaN);
      }
    }
  });

  waterInput.addEventListener('input', () => {
    if (document.activeElement === waterInput) {
      const waterVal = parseFloat(waterInput.value);
      if (!isNaN(waterVal) && waterVal > 0) {
        const calculatedCoffee = waterVal / waterPerCoffee;
        coffeeInput.value = calculatedCoffee.toFixed(1);
        updateWaterBreakdown(waterVal);
      } else {
        coffeeInput.value = '';
        updateWaterBreakdown(NaN);
      }
    }
  });

  //
  // TIMER
  //
  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval;

  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const resetBtn = document.getElementById('reset-btn');

  // New: phase indicator element
  const phaseIndicator = document.getElementById('phase-indicator');

  function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    timerDisplay.textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // New: update the phase based on elapsed seconds
  function updatePhaseIndicator(elapsedSeconds) {
    // 0 to <45  => Bloom
    // 45 to <75 => Pour 1
    // 75 to <105 => Pour 2
    // >=105 => Draw Down
    if (elapsedSeconds < 45) {
      phaseIndicator.textContent = 'Bloom Phase';
    } else if (elapsedSeconds < 75) {
      phaseIndicator.textContent = 'Pour 1';
    } else if (elapsedSeconds < 105) {
      phaseIndicator.textContent = 'Pour 2';
    } else {
      phaseIndicator.textContent = 'Draw Down';
    }
  }

  startBtn.addEventListener('click', () => {
    if (!timerInterval) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay(elapsedTime);

        // Call updatePhaseIndicator with total elapsed seconds
        const elapsedSeconds = Math.floor(elapsedTime / 1000);
        updatePhaseIndicator(elapsedSeconds);
      }, 100);
    }
  });

  stopBtn.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateTimerDisplay(elapsedTime);
    phaseIndicator.textContent = ''; // Clear or reset the phase text
  });
});
