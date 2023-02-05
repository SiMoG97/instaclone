import { useEffect, useRef } from "react";
import { CalcOriginal } from "..";
import { ARStateType } from "../..";
import styles from "../../../popup.module.scss";
import { PreviewSelectedCover } from "./PreviewSelectedCover";
import {
  useLoopVideoFromstartToEnd,
  usePositionVid,
} from "./VideoPreviewLogic";

type VideoT = {
  vidRef: React.RefObject<HTMLVideoElement>;
  img: HTMLImageElement;
  aspectRatio: ARStateType;
  sound: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  coverTime: number;
  vidUrl: string;
  isPaused: boolean;
  x: number;
  y: number;
  startsAt: number;
  endsAt: number;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
};
export function Video({
  vidRef,
  img,
  aspectRatio,
  setIsPaused,
  coverTime,
  sound,
  vidUrl,
  isPaused,
  x,
  y,
  startsAt,
  endsAt,
  setVidCurrTime,
}: VideoT) {
  const previewContainerRef = useRef<HTMLDivElement>(null);

  usePositionVid(
    { img, x, y, type: "video", vidUrl },
    previewContainerRef,
    vidRef
  );
  useLoopVideoFromstartToEnd({
    startsAt,
    endsAt,
    vidUrl,
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
  return (
    <div
      ref={previewContainerRef}
      style={
        aspectRatio === "original"
          ? {
              ...CalcOriginal(img.naturalWidth, img.naturalHeight),
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
        muted={!sound}
        ref={vidRef}
        src={vidUrl}
        onPointerUp={togglePause}
      ></video>
      <PreviewSelectedCover
        isPaused={isPaused}
        frameTime={coverTime}
        vidUrl={vidUrl}
        setIsPaused={setIsPaused}
      />
    </div>
  );
}
