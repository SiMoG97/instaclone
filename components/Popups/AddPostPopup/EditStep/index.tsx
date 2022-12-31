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
    if (!canvasRef.current) return;
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
  const ar = image.width / image.height;

  const canvasWidth = canvas.width * scale; /* canvas width scaled */
  const canvasHeight = canvas.height * scale; /* canvas height scaled */

  let width = canvasWidth;
  let height = canvasHeight;

  if (ar > 1) {
    height = canvasHeight;
    width = height * ar;
  } else if (ar < 1) {
    width = canvasWidth;
    height = width / ar;
  } else {
    width = 600 * scale;
    height = 600 * scale;
  }
  const x = (canvas.width - width) / 2 + (width * cordsX) / 100;
  const y = (canvas.height - height) / 2 + (height * cordsY) / 100;
  ctx.drawImage(image, x, y, width, height);
};
