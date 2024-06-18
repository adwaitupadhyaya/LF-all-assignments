import { allObstacles2 } from "./obstaclePoints";
export const playerDrawSize = 80;

export const SPRITE = {
  HEAD: {
    WIDTH: 800,
    HEIGHT: 400,
    COLUMNS: 8,
    ROWS: 4,
  },
  LEGS: {
    WIDTH: 200,
    HEIGHT: 50,
    COLUMNS: 8,
    ROWS: 2,
  },
};

const firstObstacleY = allObstacles2[0]?.y - 80;
export const FIREBOY = {
  DIMENSIONS: {
    WIDTH: SPRITE.HEAD.WIDTH / SPRITE.HEAD.COLUMNS,
    HEIGHT: SPRITE.HEAD.HEIGHT / SPRITE.HEAD.ROWS,
    INITIAL_POSITION: {
      X: 40,
      Y: firstObstacleY,
    },
    SPEED: {
      DX: 2.5,
      DY: 2.5,
    },
  },
  LEGS: {
    WIDTH: SPRITE.LEGS.WIDTH / SPRITE.LEGS.COLUMNS,
    HEIGHT: SPRITE.LEGS.HEIGHT / SPRITE.LEGS.ROWS,
  },
};

export const WATERGIRL = {
  DIMENSIONS: {
    WIDTH: SPRITE.HEAD.WIDTH / SPRITE.HEAD.COLUMNS,
    HEIGHT: SPRITE.HEAD.HEIGHT / SPRITE.HEAD.ROWS,
    INITIAL_POSITION: {
      X: 80,
      Y: firstObstacleY,
    },
    SPEED: {
      DX: 2.5,
      DY: 2.5,
    },
  },
  LEGS: {
    WIDTH: SPRITE.LEGS.WIDTH / SPRITE.LEGS.COLUMNS,
    HEIGHT: SPRITE.LEGS.HEIGHT / SPRITE.LEGS.ROWS,
  },
};
