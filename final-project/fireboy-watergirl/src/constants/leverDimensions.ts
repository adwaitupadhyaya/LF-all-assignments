import { CANVAS } from "./canvasDimensions";
const initialPosY = CANVAS.height / 2 + 12;
export const LEVER = {
  leverPlatform: {
    x: 24,
    y: initialPosY,
    w: 100,
    h: 24,
    id: "floor",
    draw() {},
  },
  leverController: {
    x: 150,
    y: CANVAS.height / 2 + 85,
    w: 50,
    h: 50,
  },
};
