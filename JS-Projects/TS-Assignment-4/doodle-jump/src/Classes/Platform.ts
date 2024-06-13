// Platform.ts
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
}
