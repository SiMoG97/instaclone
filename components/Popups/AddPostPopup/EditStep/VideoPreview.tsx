import { useEffect, useRef, useState } from "react";
import { ARStateType, ImgVidFileType } from "..";
import useResizeEffect from "../../../../Hooks/useResizeEffect";
import { widthAndHeightCalc } from "../utils";
import styles from "../../popup.module.scss";
import { CalcOriginal } from ".";
import Image from "next/image";

// import PlayImg

type videoPreviewType = {
  file: ImgVidFileType;
  aspectRatio: ARStateType;
};
export function VideoPreview({ file, aspectRatio }: videoPreviewType) {
  const [isPaused, setIsPaused] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  usePositionVid(file, previewContainerRef, vidRef);

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
        autoPlay
        muted
        ref={vidRef}
        src={file.vidUrl}
        onClick={togglePause}
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
    console.log(parentW, parentH);
    vidRef.current.style.transform = `translate(${x}%,${y}%)`;
  }
  useEffect(() => {
    positionVid();
  }, [file]);
  useResizeEffect(positionVid, [file]);
}
