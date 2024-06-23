import { Watergirl } from "./Watergirl";
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
