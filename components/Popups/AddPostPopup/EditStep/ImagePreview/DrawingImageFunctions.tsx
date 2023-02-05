import { AdjustT } from "..";
import { ImgVidFileType } from "../..";
import { widthAndHeightCalc } from "../../utils";
import {
  brightness,
  contrast,
  fade,
  filters,
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

export function exportImage(
  { width, height }: { width: number; height: number },
  file: ImgVidFileType,
  filterAdjust: number
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const { img, scale, x, y } = file;
  let imageData = drawImageOnCanvas(canvas, ctx, img, x, y, scale);
  if (!ctx || !imageData) return;
  imageData = ApplyAdjustments(imageData, file.adjustSettings, canvas);
  imageData = filters[file.filter](imageData, filterAdjust / 100);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
