import { useEffect, useRef } from "react";
import { CalcOriginal } from "..";
import { ARStateType, VidToUp } from "../..";
import styles from "../../../popup.module.scss";
import { PreviewSelectedCover } from "./PreviewSelectedCover";
import {
  useLoopVideoFromstartToEnd,
  usePositionVid,
} from "./VideoPreviewLogic";

type VidFileT = Omit<VidToUp, "duration" | "type" | "src">;

type VideoT = {
  vidRef: React.RefObject<HTMLVideoElement>;
  aspectRatio: ARStateType;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isPaused: boolean;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
  vidFile: VidFileT;
};
export function Video({
  vidRef,
  aspectRatio,
  setIsPaused,
  isPaused,
  vidFile,
  setVidCurrTime,
}: VideoT) {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { img, coverTime, endsAt, sound, startsAt, vidUrl, x, y } = vidFile;
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
