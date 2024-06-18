import { CANVAS } from "./constants";

export const allObstacles = {
  obstacle1: {
    x: 23,
    y: CANVAS.height - 23,
    w: CANVAS.width,
    h: 23,
  },
  obstacle2: {
    x: 23,
    y: CANVAS.height - 120,
    w: 308,
    h: 23,
  },
  obstacle3: {
    x: CANVAS.width - 100,
    y: CANVAS.height - 70,
    w: 100,
    h: 46,
  },
  obstacle4: {
    x: CANVAS.width - 25 * 4,
    y: CANVAS.height - 24 * 3,
    w: CANVAS.width - 25 * 3,
    h: CANVAS.height - 24 * 4,
  },
  obstacle5: {
    x: CANVAS.width - 25 * 3,
    y: CANVAS.height - 24 * 4,
    w: 23 * 2,
    h: 23,
  },
  obstacle6: {
    x: CANVAS.width - 23,
    y: CANVAS.height - 24 * 9,
    w: 23,
    h: 23 * 5,
  },
  obstacle7: {
    x: CANVAS.width - 25 * 5,
    y: CANVAS.height - 21 * 7,
    w: CANVAS.width - 25 * 6,
    h: CANVAS.height - 21 * 8,
  },
  obstacle8: {
    x: CANVAS.width - 25 * 10,
    y: CANVAS.height - 24 * 7,
    w: 24 * 4,
    h: 24,
  },
  obstacle9: {
    x: CANVAS.width - 25 * 10,
    y: CANVAS.height - 24 * 7,
    w: CANVAS.width - 26 * 11,
    h: CANVAS.height - 25 * 6,
  },
  obstacle10: {
    x: CANVAS.width - 26 * 14,
    y: CANVAS.height - 26 * 6,
    w: 24 * 3,
    h: 24 / 2,
  },
  obstacle11: {
    x: CANVAS.width - 26 * 14,
    y: CANVAS.height - 26 * 6,
    w: CANVAS.width - 26 * 14,
    h: CANVAS.height - 26 * 7,
  },
};
