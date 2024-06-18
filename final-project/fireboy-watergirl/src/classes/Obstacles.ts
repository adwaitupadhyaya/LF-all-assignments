// import { OBSTACLE_TYPES } from "../constants/obstacleTypes";

export class Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;

  constructor(x: number, y: number, w: number, h: number, id: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
  }

  draw(ctx: CanvasRenderingContext2D, element: Obstacle) {
    if (element.id === "backwardSlope" || element.id === "forwardSlope") {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(element.x, element.y);
      ctx.lineTo(element.w, element.h);
      ctx.stroke();
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}
