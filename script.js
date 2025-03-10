document.addEventListener('DOMContentLoaded', () => {
  //
  // COFFEE <--> WATER CALCULATOR
  //
  const coffeeInput = document.getElementById('coffee-input');
  const waterInput = document.getElementById('water-input');

  // Lines for each pour stage
  const bloomLine = document.getElementById('bloom-line');
  const pour1Line = document.getElementById('pour1-line');
  const pour2Line = document.getElementById('pour2-line');
  const drawdownLine = document.getElementById('drawdown-line');

  // Ratio: 60 g coffee : 1000 g water => ~16.6667
  const waterPerCoffee = 1000 / 60;

  function updateWaterBreakdown(totalWater) {
    // If we have a valid, positive number, calculate the breakdown
    if (!isNaN(totalWater) && totalWater > 0) {
      // Individual amounts
      const bloom = totalWater * 0.12;  // 12%
      const pour1 = totalWater * 0.48;  // 48%
      const pour2 = totalWater * 0.40;  // 40%

      // Cumulative amounts at each stage
      const bloomCumulative = bloom;                 // Bloom only
      const pour1Cumulative = bloom + pour1;         // Bloom + Pour 1
      const pour2Cumulative = bloom + pour1 + pour2; // Bloom + Pour 1 + Pour 2

      // Update each line to show the cumulative mass
      bloomLine.textContent = `Bloom (12%): ${bloomCumulative.toFixed(1)} g`;
      pour1Line.textContent = `Pour 1 (48%): ${pour1Cumulative.toFixed(1)} g`;
      pour2Line.textContent = `Pour 2 (40%): ${pour2Cumulative.toFixed(1)} g`;
      drawdownLine.textContent = `Draw Down: ${totalWater.toFixed(1)} g`;
    } else {
      // Reset if invalid
      bloomLine.textContent = 'Bloom (12%): 0 g';
      pour1Line.textContent = 'Pour 1 (48%): 0 g';
      pour2Line.textContent = 'Pour 2 (40%): 0 g';
      drawdownLine.textContent = 'Draw Down: 0 g';
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

  // Apply bold/strike styles depending on the elapsed time
  function updatePhaseStyles(elapsedSeconds) {
    // Clear all classes first
    [bloomLine, pour1Line, pour2Line, drawdownLine].forEach(line => {
      line.classList.remove('active-phase', 'completed-phase');
    });

    // 0–44s: Bloom is active
    // 45–74s: Bloom completed, Pour 1 active
    // 75–104s: Bloom & Pour 1 completed, Pour 2 active
    // >=105s: Bloom, Pour 1, Pour 2 completed, Draw Down active
    if (elapsedSeconds < 45) {
      bloomLine.classList.add('active-phase');
    } else if (elapsedSeconds < 75) {
      bloomLine.classList.add('completed-phase');
      pour1Line.classList.add('active-phase');
    } else if (elapsedSeconds < 105) {
      bloomLine.classList.add('completed-phase');
      pour1Line.classList.add('completed-phase');
      pour2Line.classList.add('active-phase');
    } else {
      bloomLine.classList.add('completed-phase');
      pour1Line.classList.add('completed-phase');
      pour2Line.classList.add('completed-phase');
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

    // Clear phase styles
    [bloomLine, pour1Line, pour2Line, drawdownLine].forEach(line => {
      line.classList.remove('active-phase', 'completed-phase');
    });
  });
});
