document.addEventListener('DOMContentLoaded', () => {
    //
    // COFFEE CALCULATOR
    //
    const coffeeInput = document.getElementById('coffee-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv   = document.getElementById('result');
  
    calculateBtn.addEventListener('click', () => {
      const coffeeAmount = parseFloat(coffeeInput.value);
  
      if (isNaN(coffeeAmount) || coffeeAmount <= 0) {
        resultDiv.textContent = 'Please enter a valid coffee amount.';
        return;
      }
      
      // Example ratio: 1:15 coffee to water
      // You will eventually replace or refine this
      const waterAmount = coffeeAmount * 15;
  
      resultDiv.textContent = `Use ${waterAmount} ml of water.`;
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
      // Convert milliseconds to minutes and seconds
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
  
      // Pad with leading zeros if needed (e.g., 08:05)
      timerDisplay.textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    startBtn.addEventListener('click', () => {
      // Only start if not already running
      if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
          elapsedTime = Date.now() - startTime;
          updateTimerDisplay(elapsedTime);
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
    });
  });
  