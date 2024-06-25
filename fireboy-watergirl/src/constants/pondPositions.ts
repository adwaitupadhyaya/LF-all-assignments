import { CANVAS } from "./canvasDimensions";

export const level1Ponds = {
  blue: {
    x: CANVAS.width / 2 - 26,
    y: CANVAS.height - 24,
    w: 100,
    h: 14,
  },
  red: {
    x: CANVAS.width / 2 + 180,
    y: CANVAS.height - 24,
    w: 100,
    h: 14,
  },
  green: {
    x: CANVAS.width / 2 + 130,
    y: CANVAS.height - 24 * 7,
    w: 100,
    h: 14,
  },
};

export const level2Ponds = {
  blue1: {
    x: 24 * 7,
    y: CANVAS.height - 11 * 2,
    w: 24 * 8,
    h: 11,
  },
  blue2: {
    x: CANVAS.width / 2 + 24 * 3,
    y: CANVAS.height - 22 * 4,
    w: 24 * 8,
    h: 11,
  },
  red1: {
    x: 24 * 7,
    y: CANVAS.height - 22 * 4,
    w: 24 * 8,
    h: 11,
  },
  red2: {
    x: CANVAS.width / 2 + 24 * 3,
    y: CANVAS.height - 11 * 2,
    w: 24 * 8,
    h: 11,
  },
  green1: {
    x: CANVAS.width / 2 + 24 * 3,
    y: CANVAS.height / 2 + 22.7 * 2,
    w: 24 * 8,
    h: 11,
  },
  green2: {
    x: 24 * 9,
    y: CANVAS.height / 2 + 22.7 * 2,
    w: 24 * 8,
    h: 11,
  },
};

export const level3Ponds = {
  blue1: {
    x: 270,
    y: 24 * 6,
    w: 100,
    h: 14,
  },
  blue2: {
    x: 520,
    y: 24 * 6,
    w: 100,
    h: 14,
  },
  blue3: {
    x: 195,
    y: CANVAS.height - 145,
    w: 110,
    h: 14,
  },
  red1: {
    x: 430,
    y: 24 * 6,
    w: 40,
    h: 14,
  },
  red2: {
    x: CANVAS.width / 2 + 80,
    y: CANVAS.height - 120,
    w: 70,
    h: 14,
  },
  red3: {
    x: CANVAS.width / 2 + 65,
    y: CANVAS.height - 24,
    w: 100,
    h: 14,
  },
};
