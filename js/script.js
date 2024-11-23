const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isAnimating = true;
let currentColor = "red";
let heartSize = 100;
const maxHeartSize = 200; 
let isSigned = false;

const heartX = (k) => 15 * Math.sin(k) ** 3;
const heartY = (k) =>
    12 * Math.cos(k) -
    5 * Math.cos(2 * k) -
    2 * Math.cos(3 * k) -
    Math.cos(4 * k);

let t = 0;
function drawHeart() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.beginPath();
    for (let i = 0; i < t; i += 0.01) {
        const x = heartX(i) * heartSize / 10;
        const y = -heartY(i) * heartSize / 10;
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (isSigned) {
        ctx.fillStyle = "#fff";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Guadalupe", canvas.width / 2, canvas.height / 2);
    }

    t += 0.05;
    if (t > Math.PI * 2) t = 0;

    requestAnimationFrame(drawHeart);
}

document.getElementById("signHeart").addEventListener("click", () => {
    isSigned = true;
    drawHeart();
});

document.getElementById("changeColor").addEventListener("click", () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "pink", "cyan"];
    currentColor = colors[Math.floor(Math.random() * colors.length)];
});

document.getElementById("resizeHeart").addEventListener("click", () => {
    if (heartSize < maxHeartSize) {
        heartSize += 20;
        drawHeart();
    } else {
        alert("¡El corazón ya alcanzó su tamaño máximo!");
    }
});

drawHeart();
