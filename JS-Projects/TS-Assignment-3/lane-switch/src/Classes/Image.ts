interface ICar {
  image: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  detectCollision(carArray: Array<object>): boolean;
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

  detectCollision(carArray: Array<ICar>): boolean {
    for (let car of carArray) {
      const distanceX = (car.x - this.x) ** 2;
      const distanceY = (car.y - this.y) ** 2;
      const distance = Math.sqrt(distanceX + distanceY);
      if (distance < this.h) {
        return true;
      }
    }
    return false;
  }
}
