import { DIMENSIONS, PLAYER_DIMENSIONS } from "./constants";
import "./style.css";
import bg from "./assets/background.png";
import playerImage from "./assets/player.png";
import Player from "./Classes/Player";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

var background = new Image();
background.src = bg;

const player = new Player(
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER_DIMENSIONS.PLAYER_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT,
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT,
  playerImage
);

const gravity = 0.5; // Gravity constant
const initialBounceVelocity = -15; // Initial upward velocity after hitting the ground

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(player.image, player.x, player.y, player.w, player.h);

  // Apply gravity to the player's velocity
  player.velocityY += gravity;

  // Update the player's position
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Check for bounce at ground level
  if (player.y >= DIMENSIONS.CANVAS_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT) {
    player.y = DIMENSIONS.CANVAS_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT; // Reset position to ground level
    player.velocityY = initialBounceVelocity; // Reset to initial upward velocity
  }

  // Check for bounce at half the screen height
  if (
    player.y <=
    DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2
  ) {
    player.velocityY *= -1; // Reverse the vertical direction
  }

  // Horizontal wrapping
  if (player.x < -PLAYER_DIMENSIONS.PLAYER_WIDTH) {
    player.x = DIMENSIONS.CANVAS_WIDTH;
  } else if (player.x > DIMENSIONS.CANVAS_WIDTH) {
    player.x = -PLAYER_DIMENSIONS.PLAYER_WIDTH;
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a": {
      player.velocityX = -2; // Move left
      break;
    }
    case "d": {
      player.velocityX = 2; // Move right
      break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a": {
      player.velocityX = 0; // Move left
      break;
    }
    case "d": {
      player.velocityX = 0; // Move right
      break;
    }
  }
});
