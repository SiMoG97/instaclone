import { useEffect, useRef } from "react";
import { ARStateType, ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { CalcOriginal } from "..";
import { PreviewSelectedCover } from "./PreviewSelectedCover";
import {
  useLoopVideoFromstartToEnd,
  usePositionVid,
} from "./VideoPreviewLogic";

type videoPreviewType = {
  file: ImgVidFileType;
  aspectRatio: ARStateType;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};
export function VideoPreview({
  file,
  aspectRatio,
  setVidCurrTime,
  isPaused,
  setIsPaused,
}: videoPreviewType) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  usePositionVid(file, previewContainerRef, vidRef);

  useLoopVideoFromstartToEnd({
    file,
    vidRef,
    isPaused,
    setIsPaused,
    setVidCurrTime,
  });

  function togglePause() {
    setIsPaused((prev) => !prev);
  }
  useEffect(() => {
    if (!vidRef.current) return;
    if (!isPaused) {
      vidRef.current.play();
    } else {
      vidRef.current.pause();
    }
  }, [isPaused]);
  // useEffect(() => {
  //   setIsPaused(() => true);
  // }, [file.coverTime]);

  return (
    <div
      ref={previewContainerRef}
      style={
        aspectRatio === "original"
          ? {
              ...CalcOriginal(file.img.naturalWidth, file.img.naturalHeight),
            }
          : {}
      }
      className={`${styles.previewVidContainer} ${
        aspectRatio !== "original"
          ? `${styles[aspectRatio]} ${styles.responsive}`
          : ""
      }`}
    >
      <video
        loop
        autoPlay={false}
        muted={!file.sound}
        ref={vidRef}
        src={file.vidUrl}
        onPointerUp={togglePause}
      ></video>
      <PreviewSelectedCover
        isPaused={isPaused}
        frameTime={file.coverTime}
        vidUrl={file.vidUrl}
        setIsPaused={setIsPaused}
      />
    </div>
  );
}
