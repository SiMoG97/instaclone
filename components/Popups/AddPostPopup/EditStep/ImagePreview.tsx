import { useEffect, useRef } from "react";
import styles from "../../popup.module.scss";
import { CalcOriginal } from ".";
import { ARStateType, ImgVidFileType } from "..";
import { widthAndHeightCalc } from "../utils";

type ImagePreviewType = {
  file: ImgVidFileType;
  width: number;
  height: number;
  aspectRatio: ARStateType;
};
export function ImagePreview({
  file,
  width,
  height,
  aspectRatio,
}: ImagePreviewType) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = file;
    const ctx = canvasRef.current.getContext("2d");
    drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }, [file]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={
        aspectRatio === "original"
          ? CalcOriginal(file.img.naturalWidth, file.img.naturalHeight)
          : {}
      }
      className={`${
        aspectRatio !== "original"
          ? `${styles[aspectRatio]} ${styles.responsive}`
          : ""
      }`}
    ></canvas>
  );
}

function drawImageOnCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  image: HTMLImageElement,
  cordsX: number,
  cordsY: number,
  scale: number
): void {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const imgAR = image.width / image.height;

  const parentW = canvas.width * scale; /* canvas width scaled if scale!=1 */
  const parentH = canvas.height * scale; /* canvas height scaled if scale!=1 */
  /* this function below returns the width and height of the image to be drawn */
  const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
  const x = (canvas.width - w) / 2 + (w * cordsX) / 100;
  const y = (canvas.height - h) / 2 + (h * cordsY) / 100;
  ctx.drawImage(image, x, y, w, h);
}
