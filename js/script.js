const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

function heartA(k) {
    return 15 * Math.sin(k) ** 3;
}

function heartB(k) {
    return (
        12 * Math.cos(k) -
        5 * Math.cos(2 * k) -
        2 * Math.cos(3 * k) -
        Math.cos(4 * k)
    );
}

let t = 0; 
const scale = 20; 
const maxPoints = 6000; 
const colors = ["#ff004d", "#ff5588", "#ff99aa", "#ffccdd"]; 

function drawHeart() {
    ctx.clearRect(0, 0, width, height); 

    const gradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 400);
    gradient.addColorStop(0, "#400011");
    gradient.addColorStop(1, "#000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.translate(width / 2, height / 2); 
    ctx.lineWidth = 2;

    for (let i = 0; i < maxPoints; i++) {
        const x = heartA(i / 100) * scale;
        const y = -heartB(i / 100) * scale; 

        const opacity = Math.sin((t + i) / 50); 
        const colorIndex = Math.floor((t / 20 + i / 1000) % colors.length); 

        ctx.strokeStyle = `rgba(${hexToRgb(colors[colorIndex])}, ${Math.abs(opacity)})`;

        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.resetTransform();
    t += 1; 
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

function animate() {
    drawHeart();
    requestAnimationFrame(animate);
}

animate();
