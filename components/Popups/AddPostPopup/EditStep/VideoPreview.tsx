import { useCallback, useEffect, useRef, useState } from "react";
import { ARStateType, ImgVidFileType } from "..";
import useWindowEventHandler from "../../../../Hooks/useWindowEventHandler";
import { widthAndHeightCalc } from "../utils";
import styles from "../../popup.module.scss";
import { CalcOriginal } from ".";
import Image from "next/image";
// import { setInterval } from "timers/promises";

// import PlayImg

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
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
};
function useLoopVideoFromstartToEnd({
  file,
  vidRef,
  isPaused,
  setIsPaused,
  setVidCurrTime,
}: LoopVidT) {
  // if the user change the video stop the current video
  useEffect(() => {
    setIsPaused(() => true);
  }, [file.id]);

  useEffect(() => {
    if (!vidRef.current) return;
    vidRef.current.currentTime = file.startsAt;
  }, [file.startsAt, file.endsAt]);

  useEffect(() => {
    if (!vidRef.current || isPaused) return;
    if (vidRef.current.currentTime < file.startsAt) {
      vidRef.current.currentTime = file.startsAt;
      setVidCurrTime(() => file.startsAt);
    }
    const myInterval = setInterval(() => {
      if (!vidRef.current) return;
      if (
        naiveRound(vidRef.current.currentTime, 1) >= naiveRound(file.endsAt, 1)
      ) {
        vidRef.current.currentTime = file.startsAt;
        setVidCurrTime(() => file.startsAt);
      } else {
        const currTime = vidRef.current.currentTime;
        setVidCurrTime(() => currTime);
      }
    }, 20);
    return () => {
      clearInterval(myInterval);
    };
  }, [file.id, file.startsAt, file.endsAt, vidRef.current, isPaused]);
}
function naiveRound(num: number, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}
