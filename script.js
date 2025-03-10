document.addEventListener('DOMContentLoaded', () => {
  //
  // COFFEE <--> WATER CALCULATOR
  //
  const coffeeInput = document.getElementById('coffee-input');
  const waterInput = document.getElementById('water-input');

  // 60 g coffee : 1000 g water => waterPerCoffee ~ 16.6667
  const waterPerCoffee = 1000 / 60; // ≈ 16.6667

  coffeeInput.addEventListener('input', () => {
    // Only update water if the user is currently typing in coffeeInput
    if (document.activeElement === coffeeInput) {
      const coffeeVal = parseFloat(coffeeInput.value);
      if (!isNaN(coffeeVal)) {
        const calculatedWater = coffeeVal * waterPerCoffee;
        waterInput.value = calculatedWater.toFixed(1); // One decimal place, adjust as you like
      } else {
        waterInput.value = '';
      }
    }
  });

  waterInput.addEventListener('input', () => {
    // Only update coffee if the user is currently typing in waterInput
    if (document.activeElement === waterInput) {
      const waterVal = parseFloat(waterInput.value);
      if (!isNaN(waterVal)) {
        const calculatedCoffee = waterVal / waterPerCoffee;
        coffeeInput.value = calculatedCoffee.toFixed(1);
      } else {
        coffeeInput.value = '';
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

  function updateTimerDisplay(time) {
    // Convert ms to minutes and seconds
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    // Pad with leading zeros (e.g., 08:05)
    timerDisplay.textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  startBtn.addEventListener('click', () => {
    if (!timerInterval) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay(elapsedTime);
      }, 100); // Update 10 times a second
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
  });
});
