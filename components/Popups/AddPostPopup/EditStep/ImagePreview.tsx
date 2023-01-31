import { useEffect, useRef } from "react";
import styles from "../../popup.module.scss";
import { AdjustT, CalcOriginal, CanvasCtxType } from ".";
import { ARStateType, ImgVidFileType } from "..";
import { widthAndHeightCalc } from "../utils";
import { brightness, vignette } from "./ImageSideBar/filters";

type ImagePreviewType = {
  file: ImgVidFileType;
  width: number;
  height: number;
  aspectRatio: ARStateType;
  adjustValues: AdjustT;
  setAdjustValues: React.Dispatch<React.SetStateAction<AdjustT>>;
};
export function ImagePreview({
  file,
  width,
  height,
  aspectRatio,
  adjustValues,
  setAdjustValues,
}: ImagePreviewType) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    // const { img, scale, x, y } = file;
    const ctx = canvasRef.current.getContext("2d");
    ctxRef.current = ctx;
    // // applyAdjustValues(ctx, adjustValues);
    // drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
    // // console.log(adjustValues);
    drawImage(ctx);
  }, [file.id]);
  function drawImage(ctx: CanvasRenderingContext2D | null) {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = file;
    // const ctx = canvasRef.current.getContext("2d");
    drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }
  useApplyBrightContSatur(adjustValues, ctxRef, drawImage);
  // useApplyBrightContSatur(adjustValues, canvasRef, ctxRef, drawImage);
  useApplyVignette(ctxRef, adjustValues, drawImage);
  useApplyBrightness(adjustValues, ctxRef, drawImage);
  // useApplyBrightness(adjustValues, ctxRef, drawImage);
  // },);
  // console.log("rerender");
  // useEffect(() => {
  //   console.log(file.filter);
  // }, [file.filter]);
  // useEffect(() => {
  //   console.log(file.adjustSettings);
  // }, [file.adjustSettings.brightness]);
  // console.log("wow it rerenders");
  // console.log("rerender");
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
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  const imgAR = image.width / image.height;

  const parentW = canvas.width * scale; /* canvas width scaled if scale!=1 */
  const parentH = canvas.height * scale; /* canvas height scaled if scale!=1 */
  /* this function below returns the width and height of the image to be drawn */
  const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
  const x = (canvas.width - w) / 2 + (w * cordsX) / 100;
  const y = (canvas.height - h) / 2 + (h * cordsY) / 100;
  ctx.drawImage(image, x, y, w, h);
}

function useApplyBrightness(
  adjustValues: AdjustT,
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  drawImage: (ctx: CanvasRenderingContext2D | null) => void
) {
  useEffect(() => {
    if (!ctxRef.current) return;
    drawImage(ctxRef.current);
    const { canvas } = ctxRef.current;
    const imageData = ctxRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    let newImgData = brightness(imageData, adjustValues.brightness / 1000);

    newImgData = vignette(newImgData, adjustValues.vignette / 200, canvas);
    ctxRef.current.putImageData(newImgData, 0, 0);
  }, [adjustValues.brightness]);
}

function useApplyBrightContSatur(
  adjustValues: AdjustT,
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  drawImage: (ctx: CanvasRenderingContext2D | null) => void
) {
  useEffect(() => {
    // if (!canvasRef.current) return;
    // const ctx = canvasRef.current.getContext("2d");
    // if (!ctx) return;
    //////////////////////////////////////////////////////////////////////////////////////////////
    // if (!ctxRef.current) return;
    // let { brightness, contrast, saturation } = adjustValues;
    // brightness = brightness < 0 ? brightness / 3 : brightness;
    // contrast = contrast < 0 ? contrast / 6 : contrast / 2;
    // const b = brightness + 100;
    // const c = contrast + 100;
    // const s = saturation + 100;
    // ctxRef.current.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    // drawImage(ctxRef.current);
    //////////////////////////////////////////////////////////////////////////////////////////////
    // ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    // const { canvas } = ctxRef.current;
    // ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    // var image = new Image();
    // image.id = "pic";
    // image.src = canvas.toDataURL();
    // ctxRef.current.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, [adjustValues.brightness, adjustValues.contrast, adjustValues.saturation]);
}
// function useApplyContrast(
//   adjustValues: AdjustT,
//   canvasRef: React.RefObject<HTMLCanvasElement>,
//   drawImage: () => void
// ) {
//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;
//     const { b, c, s } = getBrightContSature(adjustValues);
//     ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
//     drawImage();
//   }, [adjustValues.contrast]);
// }

// function applyAdjustValues(
//   ctx: CanvasRenderingContext2D | null,
//   adjustValues: AdjustT
// ) {
//   if (!ctx) return;
//   let { brightness, contrast, fade, saturation, temperature, vignette } =
//     adjustValues;
//   brightness = brightness < 0 ? brightness / 3 : brightness;
//   contrast = contrast < 0 ? contrast / 6 : contrast / 2;
//   const b = brightness + 100;
//   const c = contrast + 100;
//   const s = saturation + 100;
//   ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
//   // applyTemperature(ctx, temperature / 100);
//   // applyVignette(ctx, vignette / 100);
// }

// function applyTemperature(ctx: CanvasRenderingContext2D | null, value: number) {
//   if (!ctx) return;
//   const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
//   const data = imageData.data;

//   for (let i = 0; i < data.length; i += 4) {
//     const r = data[i];
//     const g = data[i + 1];
//     const b = data[i + 2];
//     data[i] = r + value;
//     data[i + 1] = g + value;
//     data[i + 2] = b + value;
//   }

//   ctx.putImageData(imageData, 0, 0);
// }

function useApplyVignette(
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  adjustValues: AdjustT,
  drawImage: (ctx: CanvasRenderingContext2D | null) => void
) {
  useEffect(() => {
    // if (!canvasRef.current) return;
    // const ctx = canvasRef.current.getContext("2d");
    // if (!ctx) return;
    if (!ctxRef.current) return;
    // console.log(size);
    const { canvas } = ctxRef.current;
    drawImage(ctxRef.current);

    // const canvas = canvasRef.current;
    let imageData = ctxRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    imageData = brightness(imageData, adjustValues.brightness / 1000);

    imageData = vignette(imageData, adjustValues.vignette / 200, canvas);
    // const data = imageData.data;
    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;

    // for (let i = 0; i < imageData.data.length; i += 4) {
    //   const x = (i / 4) % canvas.width;
    //   const y = Math.floor(i / 4 / canvas.width);

    //   const distance = Math.sqrt(
    //     Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    //   );
    //   const vignette =
    //     1 - size * (distance / Math.max(canvas.width, canvas.height));

    //   data[i] *= vignette;
    //   data[i + 1] *= vignette;
    //   data[i + 2] *= vignette;
    // }

    ctxRef.current.putImageData(imageData, 0, 0);
  }, [adjustValues.vignette]);
}
