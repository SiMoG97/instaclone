import { useEffect, useRef } from "react";
import { ARStateType, ImgFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";
import ArrowsAndDots from "../ArrowsAndDots";

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
    const ctx = canvasRef.current.getContext("2d");
    const { img, scale, x, y } = files[selectedFile];
    drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }, [selectedFile]);
  return (
    <div className={styles.EditStep}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width="830"
          height="830"
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
  }

  const x = (canvasWidth - width) / 2 + (width * cordsX) / 100;
  const y = (canvasHeight - height) / 2 + (height * cordsY) / 100;
  // ctx.translate(110, -500);
  // ctx.scale(scale, scale);
  ctx.drawImage(image, x, y, width, height);
};
