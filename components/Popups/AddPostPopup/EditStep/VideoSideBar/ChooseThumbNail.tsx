import { useEffect, useRef, useState } from "react";
import { ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { videosFramesT } from "../EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type ChooseThumbNailType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
  updateCoverTime(id: string, coverTime: number): void;
};

export function ChooseThumbNail({
  file,
  Vidframes,
  updateCoverTime,
}: ChooseThumbNailType) {
  const framesContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.chooseThumbnailContainer}>
      <h3 className={styles.editSectionTitle}>Cover photo</h3>
      <div className={styles.coverContaienr} ref={framesContainerRef}>
        <ImagesPreview Vidframes={Vidframes} />
        <CoverPreviewVid
          file={file}
          containerRef={framesContainerRef}
          updateCoverTime={updateCoverTime}
        />
      </div>
    </div>
  );
}

function CoverPreviewVid({
  file,
  containerRef,
  updateCoverTime,
}: {
  file: ImgVidFileType;
  containerRef: React.RefObject<HTMLDivElement>;
  updateCoverTime(id: string, coverTime: number): void;
}) {
  const thumbSliderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pointerDownHandler, pointerUpHandler, pointerMoveHandler } =
    usePointerHandlers({
      file,
      thumbSliderRef,
      containerRef,
      videoRef,
      updateCoverTime,
    });
  return (
    <div
      onPointerDown={pointerDownHandler}
      onPointerUp={pointerUpHandler}
      onPointerMove={pointerMoveHandler}
      ref={thumbSliderRef}
      className={styles.thumbnailPreview}
    >
      <video ref={videoRef} src={file.vidUrl}></video>
    </div>
  );
}

function usePointerHandlers({
  file,
  thumbSliderRef,
  containerRef,
  videoRef,
  updateCoverTime,
}: {
  file: ImgVidFileType;
  thumbSliderRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  updateCoverTime(id: string, coverTime: number): void;
}) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const cords = useRef({
    startX: 0,
    slidPosition: 0,
  });

  useEffect(() => {
    if (!thumbSliderRef.current || !containerRef.current || !videoRef.current)
      return;
    const containerW = containerRef.current.offsetWidth;
    const newDist = (file.coverTime * containerW) / file.duration;
    thumbSliderRef.current.style.transform = `translateX(${newDist}%)`;
    videoRef.current.currentTime = file.coverTime;
  }, [file.id, containerRef.current?.offsetWidth]);

  function pointerDownHandler(e: React.PointerEvent<HTMLDivElement>) {
    if (!thumbSliderRef.current || !containerRef.current) return;
    setIsPointerDown(() => true);
    thumbSliderRef.current.setPointerCapture(e.pointerId);
    cords.current.startX = e.clientX;
    cords.current.slidPosition =
      thumbSliderRef.current.getBoundingClientRect().x -
      containerRef.current.getBoundingClientRect().x;
  }

  function pointerUpHandler() {
    setIsPointerDown(() => false);
    if (!videoRef.current) return;
    // console.log(videoRef.current.currentTime);
    updateCoverTime(file.id, videoRef.current.currentTime);
  }

  function pointerMoveHandler(e: React.PointerEvent<HTMLDivElement>) {
    if (
      !thumbSliderRef.current ||
      !isPointerDown ||
      !containerRef.current ||
      !videoRef.current
    )
      return;

    const slideW = thumbSliderRef.current.offsetWidth;
    const containerW = containerRef.current.offsetWidth;
    const dist = e.clientX - cords.current.startX;
    let newdist = cords.current.slidPosition + dist;

    if (newdist <= 0) {
      newdist = 0;
    } else if (newdist >= containerW - slideW) {
      newdist = containerW - slideW;
    }
    thumbSliderRef.current.style.transform = `translateX(${newdist}px)`;

    videoRef.current.currentTime = updateVidTime({
      slideW,
      containerW,
      value: newdist,
      vidDur: videoRef.current.duration,
    });
  }

  return {
    pointerDownHandler,
    pointerUpHandler,
    pointerMoveHandler,
  };
}

function updateVidTime({
  containerW,
  slideW,
  value,
  vidDur,
}: {
  containerW: number;
  slideW: number;
  value: number;
  vidDur: number;
}) {
  const hundredP = containerW - slideW;
  return vidDur * (value / hundredP);
}

// function getTranslateXValue(element: HTMLElement) {
//   const matrex = window.getComputedStyle(element).getPropertyValue("transform");
//   const matrexArr = matrex.split(", ");
//   return parseInt(matrexArr[4]);
// }
