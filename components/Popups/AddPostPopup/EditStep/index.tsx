import { useEffect, useRef } from "react";
import { ARStateType, ImgVidFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";
import ArrowsAndDots from "../ArrowsAndDots";
import { widthAndHeightCalc } from "../utils";
import { applyMoonFilter } from "./filters";
import { CanvasWidthHeight } from "./utils";

type EditProps = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
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
  const vidCanvasDimRef = useRef({
    ...CanvasWidthHeight(aspectRatio, files[0].img),
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const { img, scale, x, y } = files[selectedFile];
    const ctx = canvasRef.current.getContext("2d");
    // applyMoonFilter(0, canvasRef.current, ctx);
    drawImageOnCanvas(canvasRef.current, ctx, img, x, y, scale);
  }, [selectedFile]);
  return (
    <div className={styles.EditStep}>
      <div className={styles.canvasContainer}>
        {files[selectedFile].type === "video" ? (
          // <h1>video hhh </h1>
          <video
            src={files[selectedFile].vidUrl}
            style={{
              width: `${vidCanvasDimRef.current.width}`,
              height: `${vidCanvasDimRef.current.height}`,
            }}
          ></video>
        ) : (
          <canvas
            ref={canvasRef}
            width={vidCanvasDimRef.current.width}
            height={vidCanvasDimRef.current.height}
            style={
              aspectRatio === "original"
                ? CalcOriginal(
                    files[0].img.naturalWidth,
                    files[0].img.naturalHeight
                  )
                : {}
            }
            className={`${
              aspectRatio !== "original" ? styles[aspectRatio] : ""
            }`}
          ></canvas>
        )}
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

function CalcOriginal(w: number, h: number) {
  const ar = w / h;
  if (ar === 1) {
    return {
      width: "100%",
      height: "100%",
      aspectRatio: `${ar}`,
    };
  } else if (ar > 1) {
    return {
      width: "100%",
      height: "auto",
      aspectRatio: `${ar}`,
    };
  }
  return {
    width: "auto",
    height: "100%",
    aspectRatio: `${ar}`,
  };
}
