// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let width = canvas.width = document.body.offsetWidth * 0.9;
let height = 0
if (maxHeight >= maxWidth * 1.35 + 180) {
  height = canvas.height = width * 2;
}
else if (maxHeight >= maxWidth * 0.75 + 180){
  height = canvas.height = width;
}
else {
  height = canvas.height = width / 2;
}



canvas.style.position = 'absolute';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, 0)';

// 生成随机数的函数

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return 'rgba(' +
    random(128, 255) + ', ' +
    random(128, 255) + ', ' +
    random(128, 255) + '0.75)';
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

let balls = [];
let numBalls = 25;
let minSize = 12;
let maxSize = 20;
if (maxWidth <= 500) {
  numBalls = 12;
  minSize = 8;
  maxSize = 14;
}

while (balls.length < numBalls) {
  let size = random(minSize, maxSize);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  balls.push(ball);
}

function loop() {
  maxWidth = window.innerWidth;
  maxHeight = window.innerHeight;
  width = canvas.width = document.body.offsetWidth * 0.9;
  if (maxHeight >= maxWidth * 1.2 + 180) {
    height = canvas.height = width * 2;
  }
  else if (maxHeight >= maxWidth * 0.75 + 180){
    height = canvas.height = width;
  }
  else {
    height = canvas.height = width / 2;
  }

  canvas.style.position = 'absolute';
  canvas.style.left = '50%';
  canvas.style.transform = 'translate(-50%, 0)';
  ctx.fillStyle = 'rgba(55, 157, 69, 1)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();

