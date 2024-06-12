import {
  DIMENSIONS,
  PLATFORM_DIMENSIONS,
  PLAYER_DIMENSIONS,
} from "./constants";
import "./style.css";
import bg from "./assets/background.png";
import playerImage from "./assets/player.png";
import platformImage from "./assets/platform.png";
import Player from "./Classes/Player";
import Platform from "./Classes/Platform";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

var background = new Image();
background.src = bg;

const player = new Player(
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER_DIMENSIONS.PLAYER_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2,
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT,
  playerImage
);

// Initialize platforms
const platforms: Platform[] = [];
const platformCount = 7; // Number of platforms

// Add a platform directly beneath the player initially
platforms.push(
  new Platform(
    DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM_DIMENSIONS.PLATFORM_WIDTH / 2,
    player.y + player.h + 10, // Position just below the player
    PLATFORM_DIMENSIONS.PLATFORM_WIDTH,
    PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
    platformImage
  )
);

function isColliding(platform1: Platform, platform2: Platform): boolean {
  return !(
    platform1.x + platform1.w < platform2.x ||
    platform1.x > platform2.x + platform2.w ||
    platform1.y + platform1.h < platform2.y ||
    platform1.y > platform2.y + platform2.h
  );
}

function generatePlatform(
  existingPlatforms: Platform[],
  platformWidth: number
): Platform {
  let x: number, y: number, newPlatform: Platform | undefined;
  let isValidPosition = false;

  while (!isValidPosition) {
    x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - platformWidth);
    y = Math.random() * DIMENSIONS.CANVAS_HEIGHT;

    newPlatform = new Platform(
      x,
      y,
      platformWidth,
      PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
      platformImage
    );

    isValidPosition = true;

    for (let i = 0; i < existingPlatforms.length; i++) {
      if (isColliding(newPlatform, existingPlatforms[i])) {
        isValidPosition = false;
        break;
      }
    }
  }

  return newPlatform!;
}

for (let i = 0; i < platformCount - 1; i++) {
  platforms.push(
    generatePlatform(platforms, PLATFORM_DIMENSIONS.PLATFORM_WIDTH)
  );
}

let gravity = 0.2; // Reduced gravity constant for smoother bounce
const initialBounceVelocity = -10; // Reduced initial upward velocity for slower bounce
const playerVelocityX = 4; // Increased horizontal velocity for wrap-around effect
let maxPlayerHeight = player.y;

let isGameOver = false;
let score = 0;

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(player.image, player.x, player.y, player.w, player.h);

  // Adjust difficulty based on score
  let platformWidth = PLATFORM_DIMENSIONS.PLATFORM_WIDTH;
  if (score >= 150) {
    platformWidth *= 0.8;
  } else if (score >= 100) {
    platformWidth *= 0.85;
  } else if (score >= 70) {
    platformWidth *= 0.9;
  }

  // Draw and update platforms
  platforms.forEach((platform) => {
    platform.y += 2; // Move platform downwards

    // Reset platform to the top if it goes off screen
    if (platform.y > DIMENSIONS.CANVAS_HEIGHT) {
      platform.y = -PLATFORM_DIMENSIONS.PLATFORM_HEIGHT;
      platform.x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - platformWidth);
      platform.w = platformWidth; // Update platform width

      // Ensure the new position doesn't collide with other platforms
      let isValidPosition = false;
      while (!isValidPosition) {
        isValidPosition = true;
        for (let otherPlatform of platforms) {
          if (
            otherPlatform !== platform &&
            isColliding(platform, otherPlatform)
          ) {
            isValidPosition = false;
            platform.y = -PLATFORM_DIMENSIONS.PLATFORM_HEIGHT;
            platform.x =
              Math.random() * (DIMENSIONS.CANVAS_WIDTH - platformWidth);
            break;
          }
        }
      }
    }

    platform.draw(ctx);
  });

  // Apply gravity to the player's velocity
  player.velocityY += gravity;

  // Update the player's position
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Update maxPlayerHeight
  maxPlayerHeight = Math.max(maxPlayerHeight, player.y);

  // Check for bounce on platforms
  platforms.forEach((platform) => {
    if (
      player.y + player.h >= platform.y &&
      player.y + player.h <= platform.y + platform.h &&
      player.x + player.w >= platform.x &&
      player.x <= platform.x + platform.w &&
      player.velocityY > 0
    ) {
      player.y = platform.y - player.h; // Reset position to platform top
      player.velocityY = initialBounceVelocity; // Reset to initial upward velocity
      score++; // Increment score on successful bounce
    }
  });

  // Ensure at least one platform is available for the player to bounce on
  if (
    player.velocityY > 0 &&
    platforms.every((platform) => player.y + player.h < platform.y)
  ) {
    platforms.push(generatePlatform(platforms, platformWidth));
  }

  // Prevent player from moving above the fixed y-axis position
  if (
    player.y <
    DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2
  ) {
    player.y =
      DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2;
    player.velocityY = 0; // Reset vertical velocity to avoid the player from moving upwards
  }

  // Check if player goes out of screen
  if (player.y > DIMENSIONS.CANVAS_HEIGHT) {
    isGameOver = true;
    ctx.font = "30px 'Gloria Hallelujah', cursive";
    ctx.fillStyle = "red";
    ctx.fillText(
      "Game Over",
      DIMENSIONS.CANVAS_WIDTH / 2 - 80,
      DIMENSIONS.CANVAS_HEIGHT / 2
    );
    ctx.fillText(
      `Score: ${score}`,
      DIMENSIONS.CANVAS_WIDTH / 2 - 60,
      DIMENSIONS.CANVAS_HEIGHT / 2 + 40
    );
    ctx.fillText(
      "Press 'R' to restart",
      DIMENSIONS.CANVAS_WIDTH / 2 - 120,
      DIMENSIONS.CANVAS_HEIGHT / 2 + 80
    );
  }

  // Display score during gameplay
  ctx.font = "20px 'Gloria Hallelujah', cursive";
  ctx.fillStyle = "red";
  ctx.fillText(`Score: ${score}`, DIMENSIONS.CANVAS_WIDTH - 100, 30);

  // Horizontal wrapping
  if (player.x < -PLAYER_DIMENSIONS.PLAYER_WIDTH) {
    player.x = DIMENSIONS.CANVAS_WIDTH;
  } else if (player.x > DIMENSIONS.CANVAS_WIDTH) {
    player.x = -PLAYER_DIMENSIONS.PLAYER_WIDTH;
  }

  if (!isGameOver) {
    requestAnimationFrame(draw);
  }
}

draw();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a": {
      player.velocityX = -playerVelocityX; // Move left
      break;
    }
    case "d": {
      player.velocityX = playerVelocityX; // Move right
      break;
    }
    case "r": {
      if (isGameOver) {
        restartGame();
      }
      break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a": {
      player.velocityX = 0; // Stop moving left
      break;
    }
    case "d": {
      player.velocityX = 0; // Stop moving right
      break;
    }
  }
});

function restartGame() {
  // Reset player position
  player.x = DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER_DIMENSIONS.PLAYER_WIDTH / 2;
  player.y = DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2;
  player.velocityX = 0;
  player.velocityY = 0;
  maxPlayerHeight = player.y;

  // Reset platforms
  platforms.forEach((platform, index) => {
    if (index === 0) {
      // Reset the initial platform position beneath the playerdd
      platform.y = player.y + player.h + 10;
      platform.x =
        DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM_DIMENSIONS.PLATFORM_WIDTH / 2;
    } else {
      // Generate new random positions for other platforms
      platform.x =
        Math.random() *
        (DIMENSIONS.CANVAS_WIDTH - PLATFORM_DIMENSIONS.PLATFORM_WIDTH);
      platform.y = Math.random() * DIMENSIONS.CANVAS_HEIGHT;
      platform.w = PLATFORM_DIMENSIONS.PLATFORM_WIDTH; // Reset to initial width
    }
  });

  isGameOver = false;
  score = 0;
  draw();
}
