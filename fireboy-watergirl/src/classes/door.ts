import { Watergirl } from "./watergirl";
import { Fireboy } from "./fireboy";

export class Door {
  redDoor: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  blueDoor: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  redDoorSprite: HTMLImageElement;
  blueDoorSprite: HTMLImageElement;

  constructor(
    redDoor: { x: number; y: number; w: number; h: number },
    blueDoor: { x: number; y: number; w: number; h: number },
    redDoorSprite: string,
    blueDoorSprite: string
  ) {
    this.redDoor = redDoor;
    this.blueDoor = blueDoor;
    this.redDoorSprite = new Image();
    this.redDoorSprite.src = redDoorSprite;
    this.blueDoorSprite = new Image();
    this.blueDoorSprite.src = blueDoorSprite;
  }

  /**
   * The draw function in TypeScript uses CanvasRenderingContext2D to draw red and blue door sprites at
   * specified positions and sizes.
   * @param {CanvasRenderingContext2D} ctx - The `ctx` parameter in the `draw` function is of type
   * `CanvasRenderingContext2D`, which is a built-in HTML5 object that provides a 2D rendering context
   * for the drawing surface of a `<canvas>` element. It is used to draw shapes, text, images, and other
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.redDoorSprite,
      0,
      0,
      100,
      100,
      this.redDoor.x,
      this.redDoor.y,
      this.redDoor.w,
      this.redDoor.h
    );
    ctx.drawImage(
      this.blueDoorSprite,
      0,
      0,
      100,
      100,
      this.blueDoor.x,
      this.blueDoor.y,
      this.blueDoor.w,
      this.blueDoor.h
    );
  }

  /**
   * The function `checkDoorCollision` checks if both Fireboy and Watergirl are colliding with their
   * respective doors.
   * @param {Fireboy} fireboy - Fireboy is a character in a game, and the `fireboy` parameter in the
   * `checkDoorCollision` function represents the position and dimensions of Fireboy in the game world.
   * @param {Watergirl} watergirl - The `watergirl` parameter in the `checkDoorCollision` function
   * represents an object of the `Watergirl` class. It likely contains properties such as `feetX` and
   * `feetY` which represent the position of Watergirl's feet, allowing the function to check for
   * collision with
   * @returns The function `checkDoorCollision` is returning a boolean value - `true` if both Fireboy and
   * Watergirl are colliding with their respective doors, and `false` otherwise.
   */
  checkDoorCollision(fireboy: Fireboy, watergirl: Watergirl): boolean {
    if (
      fireboy.feetX < this.redDoor.x + this.redDoor.w &&
      fireboy.feetX > this.redDoor.x &&
      fireboy.feetY < this.redDoor.y + this.redDoor.h &&
      fireboy.feetY > this.redDoor.y &&
      watergirl.feetX < this.blueDoor.x + this.blueDoor.w &&
      watergirl.feetX > this.blueDoor.x &&
      watergirl.feetY < this.blueDoor.y + this.blueDoor.h &&
      watergirl.feetY > this.blueDoor.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
