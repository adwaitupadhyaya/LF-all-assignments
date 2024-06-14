interface ICharacter {
  x: number;
  y: number;
  dx: number;
  dy: number;
  sprite: HTMLImageElement;
}

export class Character implements ICharacter {
  x: number;
  y: number;
  dx: number;
  dy: number;
  sprite: HTMLImageElement;

  constructor(x: number, y: number, dx: number, dy: number, sprite: string) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }
}
