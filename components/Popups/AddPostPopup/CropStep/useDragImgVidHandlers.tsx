import { useState } from "react";
import { cordType } from ".";
import { ImgVidFileType } from "..";

type useDragImgVidHandlersT = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  cords: React.MutableRefObject<cordType>;
  cropAreaRef: React.RefObject<HTMLDivElement>;
  croppingDiv: React.RefObject<HTMLDivElement>;
  selectedFile: number;
};
export function useDragImgVidHandlers({
  files,
  setFiles,
  cropAreaRef,
  croppingDiv,
  cords,
  selectedFile,
}: useDragImgVidHandlersT) {
  const [isPointerDown, setIsPointerDown] = useState(false);

  const pointerDownHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPointerDown(() => true);
    cords.current.startX = e.clientX;
    cords.current.startY = e.clientY;
  };

  const pointerUpHandler = () => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    setIsPointerDown(() => false);
    const { x, y } = imgStickToEdges(
      cropAreaRef.current,
      croppingDiv.current,
      cords.current.xBorder,
      cords.current.yBorder,
      xPercent,
      yPercent
    );

    const newFiles = files.map((file, i) => {
      if (selectedFile === i) {
        return { ...file, x, y };
      }
      return file;
    });
    setFiles(() => newFiles);
  };
  let [xPercent, yPercent] = [0, 0];
  const PointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!croppingDiv.current || !cropAreaRef.current || !isPointerDown) return;
    const { startX, startY } = cords.current;
    const { width, height } = croppingDiv.current.getBoundingClientRect();
    const { scale, x, y } = files[selectedFile];
    const distX = ((e.clientX - startX) * 100) / width;
    const distY = ((e.clientY - startY) * 100) / height;
    xPercent = x + distX;
    yPercent = y + distY;
    croppingDiv.current.style.transform = `scale(${scale}) translate(${xPercent}%,${yPercent}%)`;
  };

  return {
    isPointerDown,
    pointerDownHandler,
    pointerUpHandler,
    PointerMoveHandler,
  };
}

function imgStickToEdges(
  container: HTMLDivElement,
  movingDiv: HTMLDivElement,
  xBorder: number,
  yBorder: number,
  xPercent: number,
  yPercent: number
) {
  const {
    x: containerX,
    y: containerY,
    width: containerWidth,
    height: containerHeight,
  } = container.getBoundingClientRect();
  const {
    x: movingX,
    y: movingY,
    width,
    height,
  } = movingDiv.getBoundingClientRect();
  let [x, y] = [xPercent, yPercent];
  if (movingX > containerX) {
    x = xBorder;
  }
  if (containerX + containerWidth > movingX + width) {
    x = -xBorder;
  }
  if (movingY > containerY) {
    y = yBorder;
  }
  if (containerY + containerHeight > movingY + height) {
    y = -yBorder;
  }
  return { x, y };
}
