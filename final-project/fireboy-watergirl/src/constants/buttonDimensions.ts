import { CANVAS } from "./canvasDimensions";
const initialPosY = CANVAS.height / 2 - 80;
export const BUTTON = {
  buttonPlatform: {
    x: CANVAS.width - 24 * 5.3,
    y: initialPosY,
    w: 100,
    h: 24,
    id: "floor",
    draw() {},
  },
  button1: {
    x: 250,
    y: CANVAS.height / 2 - 5,
    w: 40,
    h: 20,
  },
  button2: {
    x: CANVAS.width - 220,
    y: CANVAS.height / 2 - 100,
    w: 40,
    h: 20,
  },
};
