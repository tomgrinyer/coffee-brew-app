document.addEventListener('DOMContentLoaded', () => {
  //
  // COFFEE <--> WATER CALCULATOR
  //
  const coffeeInput = document.getElementById('coffee-input');
  const waterInput = document.getElementById('water-input');

  // For the three-pour breakdown
  const bloomAmount = document.getElementById('bloom-amount');
  const pour1Amount = document.getElementById('pour1-amount');
  const pour2Amount = document.getElementById('pour2-amount');

  // For styling each line of breakdown
  const bloomLine = document.getElementById('bloom-line');
  const pour1Line = document.getElementById('pour1-line');
  const pour2Line = document.getElementById('pour2-line');
  const drawdownLine = document.getElementById('drawdown-line');

  // Ratio: 60 g coffee : 1000 g water => ~16.6667
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

  function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    timerDisplay.textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Update the pour phases' styles based on elapsed seconds
  function updatePhaseStyles(elapsedSeconds) {
    // Reset all lines to default
    [bloomLine, pour1Line, pour2Line, drawdownLine].forEach(line => {
      line.classList.remove('active-phase', 'completed-phase');
    });

    // 
    // Timings:
    // 0–44s: Bloom is active
    // 45–74s: Bloom completed, Pour 1 active
    // 75–104s: Bloom & Pour 1 completed, Pour 2 active
    // >=105s: Bloom, Pour 1, Pour 2 completed, Draw Down active
    //
    if (elapsedSeconds < 45) {
      bloomLine.classList.add('active-phase');
    } else if (elapsedSeconds < 75) {
      // Bloom is completed
      bloomLine.classList.add('completed-phase');
      // Pour 1 is active
      pour1Line.classList.add('active-phase');
    } else if (elapsedSeconds < 105) {
      // Bloom & Pour 1 completed
      bloomLine.classList.add('completed-phase');
      pour1Line.classList.add('completed-phase');
      // Pour 2 is active
      pour2Line.classList.add('active-phase');
    } else {
      // Bloom, Pour 1, Pour 2 completed
      bloomLine.classList.add('completed-phase');
      pour1Line.classList.add('completed-phase');
      pour2Line.classList.add('completed-phase');
      // Draw Down is active
      drawdownLine.classList.add('active-phase');
    }
  }

  startBtn.addEventListener('click', () => {
    if (!timerInterval) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay(elapsedTime);

        const elapsedSeconds = Math.floor(elapsedTime / 1000);
        updatePhaseStyles(elapsedSeconds);
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

    // Reset phases
    [bloomLine, pour1Line, pour2Line, drawdownLine].forEach(line => {
      line.classList.remove('active-phase', 'completed-phase');
    });
  });
});
