import "./reset.css";
import "./style.css";
import { DIMENSIONS } from "./constants";
import { Car } from "./Classes/Image";
import { CAR_DIMENSIONS } from "./constants";
import carImage from "././assets/player-car.png";
import { getRandomInt } from "./utils";

import enemyCarImage from "./assets/enemy-car.png";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const playerCar = new Car(
  carImage,
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

const enemyCar1 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const enemyCar2 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 -
    CAR_DIMENSIONS.CAR_WIDTH / 2 -
    DIMENSIONS.CANVAS_HEIGHT / 3,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const enemyCar3 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 -
    CAR_DIMENSIONS.CAR_WIDTH / 2 +
    DIMENSIONS.CANVAS_HEIGHT / 3,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const carArray = [enemyCar1, enemyCar2, enemyCar3];

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#343434";

  carArray.forEach((car) => {
    ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
    car.y++;
    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      car.y = getRandomInt(-600, 0);
    }
  });

  ctx.drawImage(
    playerCar.image,
    playerCar.x,
    playerCar.y,
    playerCar.w,
    playerCar.h
  );
  requestAnimationFrame(draw);
}

draw();
window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      playerCar.x -= 200;
      break;
    }

    case "d": {
      playerCar.x += 200;
      break;
    }
  }
});
