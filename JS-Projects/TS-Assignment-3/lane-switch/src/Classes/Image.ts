interface ICar {
  image: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
}

export class Car implements ICar {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  constructor(image: string, x: number, y: number, w: number, h: number) {
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
