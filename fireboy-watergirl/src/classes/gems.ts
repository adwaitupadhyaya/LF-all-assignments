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

  /**
   * The draw function in TypeScript uses the CanvasRenderingContext2D to draw an image at specified
   * coordinates and dimensions.
   * @param {CanvasRenderingContext2D} ctx - The `ctx` parameter in the `draw` function is of type
   * `CanvasRenderingContext2D`, which represents the 2D drawing context for the canvas. It provides the
   * drawing functions and properties needed to draw on the canvas, such as `drawImage` used in the
   * function.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
  }

  /**
   * The function `detectCollision` checks for collision between a player (Fireboy or Watergirl) and gems
   * in an array, and removes the gem from the array if a collision is detected.
   * @param {Fireboy | Watergirl} player - The `player` parameter in the `detectCollision` function seems
   * to represent an object that can be either a `Fireboy` or a `Watergirl`. The function checks for
   * collisions between the player object and gems in the `gemsArray` array based on certain conditions
   * specific to each type of player
   * @param gemsArray - The `gemsArray` parameter is an array containing elements that represent gems in
   * a game. Each element in the array likely has properties like `id`, `x`, `y`, `w` (width), and `h`
   * (height) to define the position and dimensions of the gem.
   */
  detectCollision(player: Fireboy | Watergirl, gemsArray: Array<this>) {
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
