import { Fireboy } from "./Fireboy";
import { Watergirl } from "./Watergirl";
import leverLeft from "../../public/images/leverLeft.png";
import leverRight from "../../public/images/leverRight.png";
import { LEVER } from "../constants/lever_dimensions";
import { Obstacle } from "./Obstacles";
import { CANVAS } from "../constants/canvasDimensions";
const targetY = LEVER.leverPlatform.y + 90;
export class Lever {
  isActive: boolean;
  leverImage: HTMLImageElement;
  leverPlatform: Obstacle;
  leverController: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  constructor(
    leverPlatform: Obstacle,
    leverController: {
      x: number;
      y: number;
      w: number;
      h: number;
    },
    lever: string
  ) {
    this.leverPlatform = leverPlatform;
    this.leverController = leverController;
    this.leverImage = new Image();
    this.leverImage.src = lever;
    this.isActive = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.leverPlatform.x,
      this.leverPlatform.y,
      this.leverPlatform.w,
      this.leverPlatform.h
    );

    ctx.drawImage(
      this.leverImage,
      this.leverController.x,
      this.leverController.y,
      this.leverController.w,
      this.leverController.h
    );
  }

  checkLeverCollision(fireboy: Fireboy, watergirl: Watergirl) {
    const leverPlatformArray = [];
    leverPlatformArray.push(this.leverPlatform);
    if (
      fireboy.x < this.leverController.x + this.leverController.w &&
      fireboy.x + fireboy.width > this.leverController.x &&
      fireboy.y < this.leverController.y + this.leverController.h &&
      fireboy.y + fireboy.height > this.leverController.y
    ) {
      this.isActive = true;
      this.leverImage.src = leverLeft;
      this.updatePlatformPosition();
      fireboy.handleCollision(leverPlatformArray);
    }
    if (
      watergirl.x < this.leverController.x + this.leverController.w &&
      watergirl.x + watergirl.width > this.leverController.x &&
      watergirl.y < this.leverController.y + this.leverController.h &&
      watergirl.y + watergirl.height > this.leverController.y
    ) {
      this.isActive = true;
      this.leverImage.src = leverLeft;
      this.updatePlatformPosition();
      watergirl.handleCollision(leverPlatformArray);
    }
  }

  updatePlatformPosition() {
    if (this.leverPlatform.y < targetY) {
      this.leverPlatform.y++;
    }
  }

  resetLeverPlatform() {
    this.leverPlatform.y = CANVAS.height / 2 + 12;
    this.leverImage.src = leverRight;
  }
}
