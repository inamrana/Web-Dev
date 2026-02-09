const bow = document.getElementById("bow");
const arrow = document.getElementById("arrow");
const target = document.getElementById("target");
const scoreBoard = document.getElementById("scoreBoard");
const arrowsLeftDisplay = document.getElementById("arrowsLeft");

let score = 0;
let arrowsLeft = 11;
let gameOver = false;
let arrowFlying = false;

let targetDirection = 1; 
let targetSpeed = 5;

function moveTarget() {
    if (gameOver) return;

    let targetTop = target.offsetTop;
    let gameHeight = document.getElementById("gameArea").clientHeight;

   
    if (targetTop >= gameHeight - 100) {
        targetDirection = -1;
    } else if (targetTop <= 50) {
        targetDirection = 1;
    }

    target.style.top = (targetTop + (targetSpeed * targetDirection)) + "px";
}


setInterval(moveTarget, 20);


document.addEventListener("click", () => {
    if (gameOver || arrowFlying || arrowsLeft <= 0) return;

    arrowFlying = true;
    arrowsLeft--;
    arrowsLeftDisplay.textContent = "Arrows: " + arrowsLeft;

    
    const bowRect = bow.getBoundingClientRect();
    const startTop = bowRect.top + (bowRect.height / 2) - (arrow.offsetHeight / 2);
    
    arrow.style.top = startTop + "px";
    arrow.style.left = "100px";
    arrow.style.display = "block";

    let arrowInterval = setInterval(() => {
        let arrowLeft = arrow.offsetLeft;
        arrow.style.left = (arrowLeft + 20) + "px"; 
       
        if (checkCollision(arrow, target)) {
            score += 10; 
            scoreBoard.textContent = "Score: " + score;
            resetArrow(arrowInterval);
        }

        
        if (arrowLeft > window.innerWidth) {
            resetArrow(arrowInterval);
        }
    }, 20);
});


function checkCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}


function resetArrow(interval) {
    clearInterval(interval);
    arrow.style.display = "none";
    arrowFlying = false;

    if (arrowsLeft === 0) {
        gameOver = true;
        setTimeout(() => {
            alert("Game Over! Final Score: " + score);
            location.reload(); // Optional: Reloads game on OK
        }, 100);
    }
}