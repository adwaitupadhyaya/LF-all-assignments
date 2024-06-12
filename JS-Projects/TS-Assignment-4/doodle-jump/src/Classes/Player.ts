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
    this.velocityX = 0; // Initialize velocityX
    this.velocityY = -2; // Initialize velocityY with a value to make it move initially
  }
}
