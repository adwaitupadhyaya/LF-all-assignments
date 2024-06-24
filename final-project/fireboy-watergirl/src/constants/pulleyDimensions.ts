import { CANVAS } from "./canvasDimensions";
import { OBSTACLE_TYPES } from "./obstacleTypes";

export const PULLEY = {
  pulley1: {
    x: 120,
    y: 150,
    w: 80,
    h: 20,
    id: OBSTACLE_TYPES.floor,
    draw() {},
  },
  pulley2: {
    x: CANVAS.width - 140,
    y: CANVAS.height - 50,
    w: 80,
    h: 20,
    id: OBSTACLE_TYPES.floor,
    draw() {},
  },
};
