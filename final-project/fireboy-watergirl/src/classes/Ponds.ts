export class Pond {
  x: number;
  y: number;
  w: number;
  h: number;
  sprite: HTMLImageElement;

  constructor(x: number, y: number, w: number, h: number, sprite: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, 0, 0, 324, 18, this.x, this.y, this.w, this.h);
  }
}
