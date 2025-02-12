let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let jumpBtn = document.getElementById("jumpBtn");
let scoreDisplay = document.getElementById("score");

let score = 0;
let isJumping = false;
let lastCactusPassed = false;
let gameOver = false;

// تحريك الصبار باستمرار
function moveCactus() {
    let cactusPosition = 800; 

    let cactusInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(cactusInterval);
            return;
        }

        cactusPosition -= 7; 
        cactus.style.left = cactusPosition + "px";

        if (cactusPosition < -50) { 
            cactusPosition = 800;
            lastCactusPassed = false; 
        }

        let dinoRect = dino.getBoundingClientRect();
        let cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.right - 10 > cactusRect.left &&
            dinoRect.left + 10 < cactusRect.right &&
            dinoRect.bottom > cactusRect.top
        ) {
            gameOver = true;
            alert("💥 خسرت! أعد المحاولة!");
            resetGame();
        }

        if (cactusRect.right < dinoRect.left && !lastCactusPassed) {
            score++;
            scoreDisplay.textContent = "النقاط: " + score;
            lastCactusPassed = true;
        }
    }, 20);
}

// وظيفة القفز
function jump() {
    if (isJumping || gameOver) return;

    isJumping = true;
    let jumpHeight = 180; // زيادة ارتفاع القفز
    let jumpSpeed = 15; // جعل القفز أبطأ قليلاً
    let gravity = 7;
    let dinoBottom = 10;

    let jumpInterval = setInterval(() => {
        if (dinoBottom >= jumpHeight) {
            clearInterval(jumpInterval);

            let fallInterval = setInterval(() => {
                dinoBottom -= gravity;
                dino.style.bottom = dinoBottom + "px";

                if (dinoBottom <= 10) {
                    clearInterval(fallInterval);
                    isJumping = false;
                    dino.style.bottom = "10px";
                }
            }, jumpSpeed);
        } else {
            dinoBottom += gravity;
            dino.style.bottom = dinoBottom + "px";
        }
    }, jumpSpeed);
}

// إعادة تشغيل اللعبة
function resetGame() {
    setTimeout(() => {
        score = 0;
        scoreDisplay.textContent = "النقاط: 0";
        gameOver = false;
        dino.style.bottom = "10px"; 
        cactus.style.left = "800px";
        moveCactus();
    }, 500);
}

// زر القفز والكيبورد
jumpBtn.addEventListener("click", jump);
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// بدء تحريك الصبار
moveCactus();
