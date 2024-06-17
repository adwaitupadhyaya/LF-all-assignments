type canvasDimensions = {
  width: number;
  height: number;
};

export const CANVAS: canvasDimensions = {
  width: 1200,
  height: 700,
};

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

export const FIREBOY = {
  DIMENSIONS: {
    WIDTH: SPRITE.HEAD.WIDTH / SPRITE.HEAD.COLUMNS,
    HEIGHT: SPRITE.HEAD.HEIGHT / SPRITE.HEAD.ROWS,
    INITIAL_POSITION: {
      X: 40,
      Y: CANVAS.height - 105,
    },
    SPEED: {
      DX: 3,
      DY: 3,
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
      X: 40,
      Y: CANVAS.height - 200,
    },
    SPEED: {
      DX: 3,
      DY: 3,
    },
  },
  LEGS: {
    WIDTH: SPRITE.LEGS.WIDTH / SPRITE.LEGS.COLUMNS,
    HEIGHT: SPRITE.LEGS.HEIGHT / SPRITE.LEGS.ROWS,
  },
};