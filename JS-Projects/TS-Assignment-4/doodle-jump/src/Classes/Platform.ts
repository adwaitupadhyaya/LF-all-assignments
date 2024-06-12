interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
}

class Platform implements IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
