import Platform from "./Platform";

interface IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  velocityX: number;
  velocityY: number;
}

export default class Player implements IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  velocityX: number;
  velocityY: number;

  constructor(x: number, y: number, w: number, h: number, img: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = img;
    this.velocityX = 0;
    this.velocityY = -2;
  }

  moveLeft(speed: number) {
    this.velocityX = -speed;
  }

  moveRight(speed: number) {
    this.velocityX = speed;
  }

  stop() {
    this.velocityX = 0;
  }

  applyGravity(gravity: number) {
    this.velocityY += gravity;
  }

  updatePosition() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  resetPosition(initialX: number, initialY: number) {
    this.x = initialX;
    this.y = initialY;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  handleCollisionWithPlatform(
    platform: Platform,
    initialBounceVelocity: number
  ) {
    if (
      this.y + this.h >= platform.y &&
      this.y + this.h <= platform.y + platform.h &&
      this.x + this.w >= platform.x &&
      this.x <= platform.x + platform.w &&
      this.velocityY > 0
    ) {
      this.y = platform.y - this.h;
      this.velocityY = initialBounceVelocity;
      return true;
    }
    return false;
  }

  handleScreenWrap(canvasWidth: number) {
    if (this.x < -this.w) {
      this.x = canvasWidth;
    } else if (this.x > canvasWidth) {
      this.x = -this.w;
    }
  }
}
