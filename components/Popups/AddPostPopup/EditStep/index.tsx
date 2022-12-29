import { useEffect, useRef } from "react";
import { ARStateType, ImgFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";
import ArrowsAndDots from "../ArrowsAndDots";
import { CanvasWidthHeight } from "./utils";

type EditProps = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
  nextFile: () => void;
  prevFile: () => void;
  aspectRatio: ARStateType;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
};

export function EditStep({
  files,
  setFiles,
  aspectRatio,
  nextFile,
  prevFile,
  selectedFile,
  setSelectedFile,
}: EditProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // console.log("out");
    if (!canvasRef.current) return;
    // console.log("in");
    const { width, height } = CanvasWidthHeight(aspectRatio, files[0].img);
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, []);
  useEffect(() => {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = files[selectedFile];
    const ctx = canvasRef.current.getContext("2d");
    drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }, [selectedFile]);
  return (
    <div className={styles.EditStep}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          style={
            aspectRatio === "original"
              ? originalArCalcul(
                  files[0].img.naturalWidth,
                  files[0].img.naturalHeight
                )
              : {}
          }
          className={`${aspectRatio !== "original" ? styles[aspectRatio] : ""}`}
        ></canvas>
      </div>
      <ArrowsAndDots
        files={files}
        nextFile={nextFile}
        prevFile={prevFile}
        selectedFile={selectedFile}
      />
    </div>
  );
}

const drawImageOnCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  image: HTMLImageElement,
  cordsX: number,
  cordsY: number,
  scale: number
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const aspectRatio = image.width / image.height;

  const canvasWidth = canvas.width * scale;
  const canvasHeight = canvas.height * scale;
  // console.log(canvasWidth);
  // console.log(canvasHeight);
  // const canvasWidth = canvas.width;
  // const canvasHeight = canvas.height;
  let width = canvasWidth;
  let height = canvasHeight;

  if (aspectRatio > 1) {
    height = canvasHeight;
    width = height * aspectRatio;
  } else if (aspectRatio < 1) {
    width = canvasWidth;
    height = width / aspectRatio;
  } else {
    width = 830 * scale;
    height = 830 * scale;
  }
  // console.log(width, height, aspectRatio);
  // console.log(scale);
  // const x = (canvasWidth - width) / 2;
  // const y = (canvasHeight - height) / 2;
  // console.log((width * cordsX) / 100);
  const x = (canvasWidth - width) / 2 + (width * cordsX) / 100;
  const y = (canvasHeight - height) / 2 + (height * cordsY) / 100;
  // console.log(width, cordsX);
  // ctx.translate(110, -500);
  // ctx.scale(scale, scale);
  ctx.drawImage(image, x, y, width, height);
  // ctx.drawImage(image, 0, 0, width, height);
};
