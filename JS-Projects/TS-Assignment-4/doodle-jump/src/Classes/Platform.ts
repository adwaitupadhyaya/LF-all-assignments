import { DIMENSIONS, PLATFORM_DIMENSIONS } from "../constants";
interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  speed: number;
}

export default class Platform implements IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  speed: number;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    img: string,
    speed: number
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = img;
    this.speed = speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  updatePosition() {
    this.y += this.speed;
  }

  resetPosition(y: number, width: number) {
    this.y = y;
    this.x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - width);
    this.w = width;
  }

  static isColliding(platform1: Platform, platform2: Platform): boolean {
    return !(
      platform1.x + platform1.w < platform2.x ||
      platform1.x > platform2.x + platform2.w ||
      platform1.y + platform1.h < platform2.y ||
      platform1.y > platform2.y + platform2.h
    );
  }

  static generatePlatform(
    existingPlatforms: Platform[],
    platformWidth: number,
    platformImage: string
  ): Platform {
    let x: number, y: number, newPlatform: Platform | undefined;
    let isValidPosition = false;

    while (!isValidPosition) {
      x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - platformWidth);
      y = Math.random() * DIMENSIONS.CANVAS_HEIGHT;

      newPlatform = new Platform(
        x,
        y,
        platformWidth,
        PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
        platformImage,
        PLATFORM_DIMENSIONS.PLATFORM_SPEED
      );

      isValidPosition = true;

      for (let i = 0; i < existingPlatforms.length; i++) {
        if (Platform.isColliding(newPlatform, existingPlatforms[i])) {
          isValidPosition = false;
          break;
        }

        const dx = newPlatform.x - existingPlatforms[i].x;
        const dy = newPlatform.y - existingPlatforms[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < 50) {
          isValidPosition = false;
          break;
        }
      }
    }

    return newPlatform!;
  }
}
