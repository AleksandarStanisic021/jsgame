import "./style.css";
import raven from "./raven.png";
import boom from "./boom.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Raven {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = raven;
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 100 + 100;
  }

  update(deltatime) {
    if (this.x < 0 - this.width) this.markedForDeletion = true;

    this.timeSinceFlap += deltatime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
    }

    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.y > canvas.height - this.height)
      this.directionY = -Math.random() * 5 - 2.5;
    if (this.y < 0) this.directionY = Math.random() * 5 - 2.5;
    if (this.x < 0 - this.width) this.directionX = Math.random() * 5 + 3;
    if (this.x > canvas.width) this.directionX = -Math.random() * 5 - 3;

    this.x -= this.directionX;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      (this.width = this.spriteWidth / 2),
      (this.height = this.spriteHeight / 2),
    );
  }
}

let ravens = [];

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  [...ravens].forEach((raven) => {
    raven.update(deltaTime);
  });
  [...ravens].forEach((raven) => {
    raven.draw();
  });
  ravens = ravens.filter((raven) => !raven.markedForDeletion);
  console.log(ravens);
  requestAnimationFrame(animate);
}
animate(0);
