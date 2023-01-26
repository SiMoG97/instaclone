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
import { useDragImgVidHandlers } from "./useDragImgVidHandlers";
import SidebarContainer from "../SidebarContainer";

type CropStepProps = {
  prevStep: number;
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
  xBorder: number;
  yBorder: number;
  passedX: boolean;
  passedY: boolean;
};
export function CropStep({
  prevStep,
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
    xBorder: 0,
    yBorder: 0,
    passedX: false,
    passedY: false,
  });

  const {
    isPointerDown,
    pointerDownHandler,
    PointerMoveHandler,
    pointerUpHandler,
  } = useDragImgVidHandlers({
    files,
    setFiles,
    cropAreaRef,
    croppingDiv,
    cords,
    selectedFile,
  });

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
    <>
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
            {files[selectedFile]?.type === "video" ? (
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
      <SidebarContainer step={1} prevStep={prevStep}>
        <div></div>
      </SidebarContainer>
    </>
  );
}
