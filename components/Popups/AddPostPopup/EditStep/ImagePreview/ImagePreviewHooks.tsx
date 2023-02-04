import { useEffect } from "react";
import { AdjustT } from "..";
import { FiltersType } from "../..";
import { filters } from "../ImageSideBar/filters";
import { ApplyAdjustments } from "./DrawingImageFunctions";

type DrawImageType = (
  ctx: CanvasRenderingContext2D | null
) => ImageData | null | undefined;

export function useApplyAdjustments(
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
export function useApplyFilter(
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
export function useDrawImageAtFirstRender(
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

export function useDrawImageFromLastTab(
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
