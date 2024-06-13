type dimension = {
  CANVAS_HEIGHT: number;
  CANVAS_WIDTH: number;
};

export const DIMENSIONS: dimension = {
  CANVAS_WIDTH: 500,
  CANVAS_HEIGHT: 700,
};

type player = {
  PLAYER_HEIGHT: number;
  PLAYER_WIDTH: number;
};

export const PLAYER_DIMENSIONS: player = {
  PLAYER_HEIGHT: 50,
  PLAYER_WIDTH: 50,
};

type platform = {
  PLATFORM_HEIGHT: number;
  PLATFORM_WIDTH: number;
  PLATFORM_SPEED: number;
};

export const PLATFORM_DIMENSIONS: platform = {
  PLATFORM_HEIGHT: 20,
  PLATFORM_WIDTH: 90,
  PLATFORM_SPEED: 2,
};
