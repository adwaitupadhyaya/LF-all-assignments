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

  /**
   * The draw function in TypeScript checks the element's id and draws either a line or a filled
   * rectangle on a canvas context accordingly.
   * @param {CanvasRenderingContext2D} ctx - CanvasRenderingContext2D is a built-in HTML object that
   * provides a 2D rendering context for the drawing surface of a <canvas> element. It is used to draw
   * shapes, text, images, and other objects onto the canvas.
   * @param {any} element - The `element` parameter in the `draw` function represents an object that
   * contains information about the element to be drawn on the canvas. It likely has properties such as
   * `id`, `x`, `y`, `w`, and `h` that are used to determine how and where to draw the
   */
  draw(ctx: CanvasRenderingContext2D, element: any) {
    if (element.id === "backwardSlope" || element.id === "forwardSlope") {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(element.x, element.y);
      ctx.lineTo(element.w, element.h);
      ctx.stroke();
    } else {
      ctx.fillStyle = "rgba(255, 255, 255)";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}
