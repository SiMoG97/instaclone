import { useEffect, useRef } from "react";
import { ARStateType, ImgFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";

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
  }, []);
  return (
    <div className={styles.EditStep}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width="800"
          height="800"
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

  const aspectRatio = image.width / image.height;

  const canvasWidth = canvas.getBoundingClientRect().width * scale;
  const canvasHeight = canvas.getBoundingClientRect().height * scale;
  console.log(canvasWidth, canvasHeight);
  let width = canvasWidth;
  let height = canvasHeight;

  // console.log(canvasWidth);
  if (aspectRatio > 1) {
    height = canvasHeight;
    width = height * aspectRatio;
  } else if (aspectRatio < 1) {
    width = canvasWidth;
    height = width / aspectRatio;
  }
  // console.log(width, height);

  // console.log(height, width);
  // console.log("cords:", cordsX, cordsY);
  const x = (canvasWidth - width) / 2 + (width * cordsX) / 100;
  const y = (canvasHeight - height) / 2 + (height * cordsY) / 100;
  // ctx.scale(scale, scale);
  // console.log(width, height);
  ctx.drawImage(image, x, y, width, height);
};
