const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [
  "¿QUIERES SEGUIR SIENDO",
  "MI ENAMORADA BELINDA"
];

const colors = [
  "#FF4B4B", "#FF884B", "#FFD84B", "#9FFF4B", "#4BFF89", "#4BFFFC",
  "#4B94FF", "#6F4BFF", "#D14BFF", "#FF4BE0", "#FF4B8A", "#FF4B4B"
];

class LineGroup {
  constructor(text, startY, colorOffset = 0) {
    this.text = text;
    this.x = canvas.width / 2;
    this.y = startY;
    this.dy = -1;
    this.letters = [];
    this.colorOffset = colorOffset;

    this.setupLetters();
  }

  setupLetters() {
    const fontSize = 40;
    const totalWidth = this.text.length * fontSize;
    let startX = this.x - totalWidth / 2;

    for (let i = 0; i < this.text.length; i++) {
      this.letters.push({
        char: this.text[i],
        x: startX + i * fontSize,
        color: colors[(i + this.colorOffset) % colors.length]
      });
    }
  }

  update() {
    this.y += this.dy;
  }

  draw() {
    const fontSize = 40;
    for (let i = 0; i < this.letters.length; i++) {
      const letter = this.letters[i];

      // Dibujar corazón
      ctx.beginPath();
      const heartX = letter.x;
      const heartY = this.y - 35;
      ctx.moveTo(heartX, heartY);
      ctx.bezierCurveTo(heartX, heartY - 6, heartX - 10, heartY - 6, heartX - 10, heartY);
      ctx.bezierCurveTo(heartX - 10, heartY + 6, heartX, heartY + 10, heartX, heartY + 16);
      ctx.bezierCurveTo(heartX, heartY + 10, heartX + 10, heartY + 6, heartX + 10, heartY);
      ctx.bezierCurveTo(heartX + 10, heartY - 6, heartX, heartY - 6, heartX, heartY);
      ctx.fillStyle = "red";
      ctx.fill();

      // Dibujar letra
      ctx.font = "bold 40px Arial";
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, letter.x - 10, this.y);
    }
  }
}

const line1 = new LineGroup(lines[0], canvas.height - 50, 0);
const line2 = new LineGroup(lines[1], canvas.height + 30, 5);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  line1.update();
  line1.draw();
  line2.update();
  line2.draw();
  requestAnimationFrame(animate);
}

animate();
