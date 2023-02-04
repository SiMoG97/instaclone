import { AdjustT } from "..";
import { widthAndHeightCalc } from "../../utils";
import {
  brightness,
  contrast,
  fade,
  saturation,
  temperature,
  vignette,
} from "../ImageSideBar/filters";

export function drawImageOnCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  image: HTMLImageElement | null,
  cordsX: number,
  cordsY: number,
  scale: number
) {
  if (!ctx || !image) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const imgAR = image.width / image.height;

  const parentW = canvas.width * scale; /* canvas width scaled if scale!=1 */
  const parentH = canvas.height * scale; /* canvas height scaled if scale!=1 */
  /* this function below returns the width and height of the image to be drawn */
  const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
  const x = (canvas.width - w) / 2 + (w * cordsX) / 100;
  const y = (canvas.height - h) / 2 + (h * cordsY) / 100;
  ctx.drawImage(image, x, y, w, h);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData;
}

export function ApplyAdjustments(
  imageData: ImageData,
  adjustValues: AdjustT,
  canvas: HTMLCanvasElement
) {
  imageData = brightness(imageData, adjustValues.brightness / 600);
  imageData = contrast(imageData, adjustValues.contrast / 600);
  imageData = saturation(imageData, adjustValues.saturation / 100);
  imageData = temperature(imageData, adjustValues.temperature / 800);
  imageData = fade(imageData, adjustValues.fade / 500);
  imageData = vignette(imageData, adjustValues.vignette / 100, canvas);
  return imageData;
}
