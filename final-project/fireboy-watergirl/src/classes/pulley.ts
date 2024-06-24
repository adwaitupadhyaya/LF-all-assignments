import { CANVAS } from "../constants/canvasDimensions";
import { pulleyPlatformDetect } from "../utils/pulleyPlatform";
import { Fireboy } from "./fireboy";
import { Obstacle } from "./obstacles";
import { Watergirl } from "./watergirl";

const pulley1Target: number = CANVAS.height / 2;
const pulley2Target: number = 100;

export class Pulley {
  pulleyPlatform1: Obstacle;
  pulleyPlatform2: Obstacle;
  isActive: boolean;

  constructor(pulleyPlatform1: Obstacle, pulleyPlatform2: Obstacle) {
    this.pulleyPlatform1 = pulleyPlatform1;
    this.pulleyPlatform2 = pulleyPlatform2;
    this.isActive = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgb(197,197,197)";
    ctx.fillRect(
      this.pulleyPlatform1.x,
      this.pulleyPlatform1.y,
      this.pulleyPlatform1.w,
      this.pulleyPlatform1.h
    );
    ctx.fillRect(
      this.pulleyPlatform2.x,
      this.pulleyPlatform2.y,
      this.pulleyPlatform2.w,
      this.pulleyPlatform2.h
    );
  }

  handlePulleyPlatform(fireboy: Fireboy, watergirl: Watergirl) {
    if (
      fireboy.x < this.pulleyPlatform2.x + this.pulleyPlatform2.w &&
      fireboy.x + fireboy.width > this.pulleyPlatform2.x &&
      fireboy.y < this.pulleyPlatform2.y + this.pulleyPlatform2.h &&
      fireboy.y + fireboy.height > this.pulleyPlatform2.y
    ) {
      pulleyPlatformDetect([this.pulleyPlatform2], fireboy);
    }

    if (
      watergirl.x < this.pulleyPlatform1.x + this.pulleyPlatform1.w &&
      watergirl.x + watergirl.width > this.pulleyPlatform1.x &&
      watergirl.y < this.pulleyPlatform1.y + this.pulleyPlatform1.h &&
      watergirl.y + watergirl.height > this.pulleyPlatform1.y
    ) {
      pulleyPlatformDetect([this.pulleyPlatform1], watergirl);
      this.isActive = true;
      this.handleActiveCondition();
    }
  }

  handleActiveCondition() {
    if (this.isActive) {
      if (this.pulleyPlatform1.y < pulley1Target) {
        this.pulleyPlatform1.y++;
      }
      if (this.pulleyPlatform2.y > pulley2Target) {
        {
          this.pulleyPlatform2.y--;
        }
      }
    }
  }
}
