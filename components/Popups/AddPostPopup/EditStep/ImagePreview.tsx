import { useEffect, useRef } from "react";
import styles from "../../popup.module.scss";
import { AdjustT, CalcOriginal } from ".";
import { ARStateType, FiltersType, ImgVidFileType } from "..";
import { widthAndHeightCalc } from "../utils";
import {
  brightness,
  contrast,
  fade,
  filters,
  saturation,
  temperature,
  vignette,
} from "./ImageSideBar/filters";

type DrawImageType = (
  ctx: CanvasRenderingContext2D | null
) => ImageData | null | undefined;
type ImagePreviewType = {
  file: ImgVidFileType;
  width: number;
  height: number;
  aspectRatio: ARStateType;
  adjustValues: AdjustT;
  currFilterVal: number;
  tab: "Filters" | "Adjustments";
};
export function ImagePreview({
  file,
  width,
  height,
  aspectRatio,
  adjustValues,
  currFilterVal,
  tab,
}: ImagePreviewType) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const initialRenderRef = useRef(true);

  useDrawImageAtFirstRender(
    canvasRef,
    ctxRef,
    drawImage,
    file.filter,
    file.adjustSettings,
    file.id
  );

  useDrawImageFromLastTab(
    ctxRef,
    initialRenderRef.current,
    drawImage,
    tab,
    file.filter,
    currFilterVal,
    file.adjustSettings
  );

  useApplyFilter(
    ctxRef,
    initialRenderRef.current,
    drawImage,
    file.filter,
    currFilterVal,
    file.adjustSettings
  );

  useApplyAdjustments(
    adjustValues,
    ctxRef,
    drawImage,
    file.filter,
    currFilterVal
  );

  function drawImage(ctx: CanvasRenderingContext2D | null) {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = file;
    return drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }

  useEffect(() => {
    initialRenderRef.current = false;
  }, [file.id]);
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

function useApplyAdjustments(
  adjustValues: AdjustT,
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  drawImage: DrawImageType,
  filterName: FiltersType,
  filterVal: number
) {
  useEffect(() => {
    if (!ctxRef.current) return;
    const { canvas } = ctxRef.current;
    let imageData = drawImage(ctxRef.current);
    if (!imageData) return;
    imageData = ApplyAdjustments(imageData, adjustValues, canvas);
    imageData = filters[filterName](imageData, filterVal / 100);
    ctxRef.current.putImageData(imageData, 0, 0);
  }, [adjustValues]);
}
function useApplyFilter(
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  firstRender: boolean,
  drawImage: DrawImageType,
  filterName: FiltersType,
  filterVal: number,
  adjustValues: AdjustT
) {
  useEffect(() => {
    if (!ctxRef.current || firstRender) return;
    const { canvas } = ctxRef.current;
    let imageData = drawImage(ctxRef.current);
    if (!imageData) return;
    imageData = ApplyAdjustments(imageData, adjustValues, canvas);
    imageData = filters[filterName](imageData, filterVal / 100);
    ctxRef.current.putImageData(imageData, 0, 0);
  }, [filterName, filterVal]);
}
function useDrawImageAtFirstRender(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  drawImage: DrawImageType,
  filterName: FiltersType,
  adjustValues: AdjustT,
  fileId: string
) {
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
    let imageData = drawImage(ctx);
    if (!imageData) return;
    imageData = filters[filterName](imageData, 1);
    imageData = ApplyAdjustments(imageData, adjustValues, canvas);
    ctx.putImageData(imageData, 0, 0);
  }, [fileId]);
}

function useDrawImageFromLastTab(
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  firstRender: boolean,
  drawImage: DrawImageType,
  tab: "Filters" | "Adjustments",
  filterName: FiltersType,
  filterVal: number,
  adjustValues: AdjustT
) {
  useEffect(() => {
    if (!ctxRef.current || firstRender) return;
    const { canvas } = ctxRef.current;
    if (tab === "Filters") {
      let imageData = drawImage(ctxRef.current);
      if (!imageData) return;
      imageData = ApplyAdjustments(imageData, adjustValues, canvas);
      ctxRef.current.putImageData(imageData, 0, 0);
      const image = new Image();
      image.src = canvas.toDataURL();
      imageData = filters[filterName](imageData, filterVal / 100);
      ctxRef.current.putImageData(imageData, 0, 0);
    } else {
      let imageData = drawImage(ctxRef.current);
      if (!imageData) return;
      imageData = ApplyAdjustments(imageData, adjustValues, canvas);
      imageData = filters[filterName](imageData, filterVal / 100);
      ctxRef.current.putImageData(imageData, 0, 0);
    }
  }, [tab]);
}

function ApplyAdjustments(
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

function applyFilter() {}
