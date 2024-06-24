import { Fireboy } from "./fireboy";
import { Watergirl } from "./watergirl";

export class Gems {
  x: number;
  y: number;
  w: number;
  h: number;
  sprite: HTMLImageElement;
  id: string;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    sprite: string,
    id: string
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.id = id;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
  }

  detectCollision(player: Fireboy | Watergirl, gemsArray: Array<this>) {
    // rect1.x < rect2.x + rect2.w &&
    // rect1.x + rect1.w > rect2.x &&
    // rect1.y < rect2.y + rect2.h &&
    // rect1.y + rect1.h > rect2.y;

    if (player.constructor.name === "Fireboy" && this.id == "red") {
      if (
        player.x < this.x + this.w &&
        player.x + player.width > this.x &&
        player.y < this.y + this.h &&
        player.y + player.height > this.y
      ) {
        console.log("red gem collected");
        gemsArray.forEach((element, index) => {
          if (element === this) {
            gemsArray.splice(index, 1);
          }
        });
      }
    }
    if (player.constructor.name === "Watergirl" && this.id == "blue") {
      if (
        player.x < this.x + this.w &&
        player.x + player.width > this.x &&
        player.y < this.y + this.h &&
        player.y + player.height > this.y
      ) {
        console.log("blue gem collected");
        gemsArray.forEach((element, index) => {
          if (element === this) {
            gemsArray.splice(index, 1);
          }
        });
      }
    }
  }
}
