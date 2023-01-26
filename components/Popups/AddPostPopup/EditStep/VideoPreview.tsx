import { useCallback, useEffect, useRef, useState } from "react";
import { ARStateType, ImgVidFileType } from "..";
import useWindowEventHandler from "../../../../Hooks/useWindowEventHandler";
import { widthAndHeightCalc } from "../utils";
import styles from "../../popup.module.scss";
import { CalcOriginal } from ".";
import Image from "next/image";
import { useCurrTimeContext } from "./CurrTimeContext";
// import { setInterval } from "timers/promises";

// import PlayImg

type videoPreviewType = {
  file: ImgVidFileType;
  aspectRatio: ARStateType;
};
export function VideoPreview({ file, aspectRatio }: videoPreviewType) {
  const [isPaused, setIsPaused] = useState(true);
  const vidRef = useRef<HTMLVideoElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  usePositionVid(file, previewContainerRef, vidRef);
  useLoopVideoFromstartToEnd({ file, vidRef, isPaused, setIsPaused });

  function togglePause() {
    setIsPaused((prev) => {
      if (!vidRef.current) return prev;
      if (prev) {
        vidRef.current.play();
      } else {
        vidRef.current.pause();
      }
      return !prev;
    });
  }

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
      {isPaused ? (
        <div className={styles.playBtnImg}>
          <Image src="/play.png" layout="fill" alt="Play button image" />
        </div>
      ) : null}
    </div>
  );
}
function usePositionVid(
  file: ImgVidFileType,
  previewContainerRef: React.RefObject<HTMLDivElement>,
  vidRef: React.RefObject<HTMLVideoElement>
) {
  function positionVid() {
    if (
      file.type !== "video" ||
      !previewContainerRef.current ||
      !vidRef.current
    )
      return;
    const { img, x, y } = file;
    const imgAR = img.naturalWidth / img.naturalHeight;
    const preview = previewContainerRef.current;
    const [parentW, parentH] = [preview.offsetWidth, preview.offsetHeight];
    const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
    vidRef.current.style.width = `${w}px`;
    vidRef.current.style.height = `${h}px`;
    vidRef.current.style.transform = `translate(${x}%,${y}%)`;
  }
  useEffect(() => {
    positionVid();
  }, [file]);
  useWindowEventHandler(positionVid, [file]);
}

type LoopVidT = {
  file: ImgVidFileType;
  vidRef: React.RefObject<HTMLVideoElement>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};
function useLoopVideoFromstartToEnd({
  file,
  vidRef,
  isPaused,
  setIsPaused,
}: LoopVidT) {
  // if the user change the video stop the current video
  useEffect(() => {
    setIsPaused(() => true);
  }, [file.id]);

  useEffect(() => {
    if (!vidRef.current || isPaused) return;
    if (vidRef.current.currentTime < file.startsAt) {
      vidRef.current.currentTime = file.startsAt;
    }
    const myInterval = setInterval(() => {
      if (!vidRef.current) return;
      if (vidRef.current.currentTime >= file.endsAt) {
        vidRef.current.currentTime = file.startsAt;
      }
    }, 80);
    return () => {
      clearInterval(myInterval);
    };
  }, [file.id, file.startsAt, file.endsAt, vidRef.current, isPaused]);
}
