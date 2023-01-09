import styles from "../../popup.module.scss";
import React, { useRef, useState } from "react";
import AspectRatioDropUp from "./AspectRatioDropUp";
import { ARStateType, ImgVidFileType, originalArCalcul } from "..";
import ZoomDropup from "./ZoomDropup";
import AdditionalPostsDropup from "./AdditionalPostsDropup";
import ArrowsAndDots from "../ArrowsAndDots";
import { usePreviewImgVid } from "./usePreviewImgVidHook";
import { Grid } from "./Grid";
import { useImgToBgDimensions } from "./useImgToBgDimensions";

type CropStepProps = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  nextFile: () => void;
  prevFile: () => void;
  selectedFileIdRef: React.MutableRefObject<string>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  aspectRatio: ARStateType;
  setAspectRatio: React.Dispatch<React.SetStateAction<ARStateType>>;
};
export type cordType = {
  startX: number;
  startY: number;
  tx: number;
  ty: number;
  xBorder: number;
  yBorder: number;
  counterX: number;
  passedX: boolean;
  counterY: number;
  passedY: boolean;
};
export function CropStep({
  files,
  setFiles,
  nextFile,
  prevFile,
  selectedFile,
  setSelectedFile,
  selectedFileIdRef,
  setStep,
  setAlertMessage,
  aspectRatio,
  setAspectRatio,
}: CropStepProps) {
  const [someDropOpen, setSomeDropOpen] = useState(false);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cords = useRef<cordType>({
    startX: 0,
    startY: 0,
    tx: 0,
    ty: 0,
    xBorder: 0,
    yBorder: 0,
    counterX: 0,
    passedX: false,
    counterY: 0,
    passedY: false,
  });

  const [isPointerDown, setIsPointerDown] = useState(false);

  const pointerDownHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPointerDown(() => true);
    cords.current.startX = e.clientX;
    cords.current.startY = e.clientY;
  };

  // const pointerUpHandler = (e: React.PointerEvent<HTMLDivElement>) => {
  const pointerUpHandler = () => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    setIsPointerDown(() => false);

    const {
      x: movingX,
      y: movingY,
      width,
      height,
    } = croppingDiv.current.getBoundingClientRect();

    const {
      x: containerX,
      y: containerY,
      width: containerWidth,
      height: containerHeight,
    } = cropAreaRef.current.getBoundingClientRect();

    if (movingX > containerX) {
      cords.current.tx = cords.current.xBorder;
    }
    if (containerX + containerWidth > movingX + width) {
      cords.current.tx = -cords.current.xBorder;
    }
    if (movingY > containerY) {
      cords.current.ty = cords.current.yBorder;
    }
    if (containerY + containerHeight > movingY + height) {
      cords.current.ty = -cords.current.yBorder;
    }

    const newFiles = files.map((file, i) => {
      if (selectedFile === i) {
        return { ...file, x: cords.current.tx, y: cords.current.ty };
      }
      return file;
    });
    setFiles(() => newFiles);
  };

  const PointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    if (!isPointerDown) return;
    const { startX, startY } = cords.current;
    const {
      width,
      height,
      x: movingX,
    } = croppingDiv.current.getBoundingClientRect();
    const { x: containerX, width: containerWidth } =
      cropAreaRef.current.getBoundingClientRect();
    const { scale, x, y } = files[selectedFile];

    if (movingX > containerX || containerX + containerWidth > movingX + width) {
      cords.current.counterX++;
      if (cords.current.counterX === 1) {
        let newX = cords.current.xBorder;
        if (containerX + containerWidth > movingX + width) {
          newX = -newX;
        }
      }
    } else {
      cords.current.counterX = 0;
    }
    const distX = ((e.clientX - startX) * 100) / width;
    const distY = ((e.clientY - startY) * 100) / height;

    const xPercent = x + distX;
    const YPercent = y + distY;

    croppingDiv.current.style.transform = `scale(${scale}) translate(${xPercent}%,${YPercent}%)`;
    cords.current.tx = xPercent;
    cords.current.ty = YPercent;
  };

  usePreviewImgVid(
    files,
    selectedFile,
    croppingDiv,
    cropAreaRef,
    videoRef,
    cords,
    aspectRatio
  );
  useImgToBgDimensions(
    files,
    croppingDiv,
    cropAreaRef,
    videoRef,
    selectedFile,
    aspectRatio
  );

  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div
        ref={cropAreaRef}
        onPointerMove={PointerMoveHandler}
        onPointerDown={pointerDownHandler}
        onPointerUp={pointerUpHandler}
        style={
          aspectRatio === "original"
            ? originalArCalcul(
                files[0].img.naturalWidth,
                files[0].img.naturalHeight
              )
            : {}
        }
        className={`${styles.cropArea} ${
          aspectRatio !== "original" ? styles[aspectRatio] : ""
        }`}
      >
        <div
          ref={croppingDiv}
          style={isPointerDown ? {} : { transition: "transform .3s" }}
          className={styles.imgToCrop}
        >
          {files[selectedFile].type === "video" ? (
            <video
              autoPlay
              muted
              ref={videoRef}
              className={styles.videoCrop}
            ></video>
          ) : null}
        </div>
        <Grid isPointerDown={isPointerDown} />
      </div>
      <AspectRatioDropUp
        isOpen={someDropOpen}
        setIsOpen={setSomeDropOpen}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
      />
      {files.length > 0 && files[selectedFile].type === "image" ? (
        <ZoomDropup
          element={croppingDiv}
          files={files}
          isOpen={someDropOpen}
          selectedFile={selectedFile}
          setFiles={setFiles}
          setIsOpen={setSomeDropOpen}
        />
      ) : null}
      <AdditionalPostsDropup
        isOpen={someDropOpen}
        setIsOpen={setSomeDropOpen}
        files={files}
        setFiles={setFiles}
        setSelectedFile={setSelectedFile}
        selectedFileIdRef={selectedFileIdRef}
        setStep={setStep}
        selectedFile={selectedFile}
        setAlertMessage={setAlertMessage}
      />
      <ArrowsAndDots
        files={files}
        nextFile={nextFile}
        prevFile={prevFile}
        selectedFile={selectedFile}
      />
    </div>
  );
}
