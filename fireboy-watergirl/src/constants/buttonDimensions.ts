import { CANVAS } from "./canvasDimensions";
const initialPosY = CANVAS.height / 2 - 80;
export const BUTTON_LEVEL_1 = {
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

export const BUTTON_LEVEL_2 = {
  buttonPlatform: {
    x: CANVAS.width / 2 + 50,
    y: 24 * 5,
    w: 100,
    h: 20,
    id: "floor",
    draw() {},
  },
  button1: {
    x: 250,
    y: 24 * 4.5,
    w: 40,
    h: 20,
  },
  button2: {
    x: CANVAS.width - 250,
    y: 24 * 4.5,
    w: 40,
    h: 20,
  },
};
