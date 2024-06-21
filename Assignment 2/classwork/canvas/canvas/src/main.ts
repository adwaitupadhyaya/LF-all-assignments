import "./style.css";
import { DIMENSIONS } from "./constants";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas?.getContext("2d");

console.log(DIMENSIONS.CANVAS_WIDTH, ctx);
