import { useEffect, useRef } from "react";
import styles from "../../../popup.module.scss";
import { AdjustT, CalcOriginal } from "..";
import { ARStateType, ImgVidFileType } from "../..";
import {
  useApplyAdjustments,
  useApplyFilter,
  useDrawImageAtFirstRender,
  useDrawImageFromLastTab,
} from "./ImagePreviewHooks";
import { drawImageOnCanvas } from "./DrawingImageFunctions";

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

  function drawImage(ctx: CanvasRenderingContext2D | null) {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = file;
    return drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }

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
