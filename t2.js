    const bow = document.getElementById("bow");
    const arrow = document.getElementById("arrow");
    const target = document.getElementById("target");
    const scoreBoard = document.getElementById("scoreBoard");

    let score = 0;
    let arrowsLeft = 10;   // total shots
    let gameOver = false;


    let targetDirection = 1;   // 1 = down, -1 = up

  function moveTarget() {
    if (gameOver) return;

    let top = target.offsetTop;

    if (top <= 50 || top >= 450) {
      targetDirection *= -1;
    }

    target.style.top = top + (9 * targetDirection) + "px";
  }

  setInterval(moveTarget, 50);

 let arrowFlying = false;

  document.addEventListener("click", () => {
    if (gameOver) return;
    if (arrowFlying) return;
    if (arrowsLeft <= 0) return;

    arrowFlying = true;
    arrowsLeft--;
    document.getElementById("arrowsLeft").textContent = "Arrows: " + arrowsLeft;
 
    arrow.style.display = "block";
    arrow.style.left = "80px";
    arrow.style.top = target.offsetTop + 30 + "px";

    let arrowInterval = setInterval(() => {
      let arrowLeft = arrow.offsetLeft;
      arrow.style.left = arrowLeft + 15 + "px";

      // HIT CHECK
      if (
        arrow.offsetLeft + arrow.offsetWidth >= target.offsetLeft &&
        arrow.offsetTop >= target.offsetTop &&
        arrow.offsetTop <= target.offsetTop + target.offsetHeight
      ) {
        score++;
        scoreBoard.textContent = "Score: " + score;
        resetArrow(arrowInterval);
      }

      // MISS CHECK
      if (arrowsLeft > window.innerWidth) {
        resetArrow(arrowInterval);
      }
    }, 20);
  });

  function resetArrow(interval) {
    clearInterval(interval);
    arrowFlying = false;
    arrow.style.display = "none";

    if (arrowsLeft === 0) {
      gameOver = true;
      alert("Game Over! Your score: " + score);
    }
  }