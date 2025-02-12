// إعداد الـ Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// تحديد أبعاد اللعبة
canvas.width = 800;
canvas.height = 300;

// تحميل صور الديناصور والصبار
const dinoImg = new Image();
dinoImg.src = "dino.png"; // تأكد من وضع الصورة الصحيحة

const cactusImg = new Image();
cactusImg.src = "cactus.png"; // تأكد من وضع الصورة الصحيحة

// تعريف الكائنات
let dino, cactus, isGameOver;

// دالة إعادة ضبط اللعبة
function resetGame() {
    dino = {
        x: 50,
        y: 220,
        width: 50,
        height: 50,
        velocityY: 0,
        gravity: 1.5,
        isJumping: false,
    };

    cactus = {
        x: canvas.width,
        y: 220,
        width: 40,
        height: 50,
        speed: 5,
    };

    isGameOver = false;
    document.getElementById("gameOver").classList.add("hidden");

    update(); // إعادة تشغيل التحديثات
}

// دالة القفز
function jump() {
    if (!dino.isJumping && !isGameOver) {
        dino.velocityY = -20;
        dino.isJumping = true;
    } else if (isGameOver) {
        resetGame(); // إعادة تشغيل اللعبة عند الخسارة
    }
}

// دالة الكشف عن الاصطدام
function checkCollision() {
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        isGameOver = true;
        document.getElementById("gameOver").classList.remove("hidden");
    }
}

// تحديث اللعبة
function update() {
    if (isGameOver) return; // إيقاف التحديث عند الخسارة

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // تحديث موضع الديناصور
    dino.y += dino.velocityY;
    dino.velocityY += dino.gravity;

    if (dino.y >= 220) {
        dino.y = 220;
        dino.isJumping = false;
    }

    // تحديث موضع الصبار
    cactus.x -= cactus.speed;

    if (cactus.x + cactus.width < 0) {
        cactus.x = canvas.width;
    }

    // التحقق من التصادم
    checkCollision();

    // رسم الديناصور والصبار
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);

    requestAnimationFrame(update);
}

// التحكم بالقفز عند الضغط على زر المسافة
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

// تشغيل اللعبة
resetGame();
