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
  }
  update() {
    this.x -= this.directionX;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
    raven.update();
  });
  [...ravens].forEach((raven) => {
    raven.draw();
  });

  requestAnimationFrame(animate);
}
animate(0);
