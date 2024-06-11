import { Car } from "./Classes/Image";

export function getRandomInt(max: number, min: number): number {
  return Math.random() * (max - min) + min;
}

export function isSpacedApart(cars: Car[], spacing: number): boolean {
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      if (Math.abs(cars[i].y - cars[j].y) < spacing) {
        return false;
      }
    }
  }
  return true;
}
