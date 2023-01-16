import { useEffect, useRef, useState } from "react";
import { ImgVidFileType } from "..";
import styles from "../../popup.module.scss";
import { videosFramesT } from "./EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type ChooseThumbNailType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
};

export function ChooseThumbNail({ file, Vidframes }: ChooseThumbNailType) {
  const framesContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.chooseThumbnailContainer}>
      <h3 className={styles.editSectionTitle}>Cover photo</h3>
      <div className={styles.coverContaienr} ref={framesContainerRef}>
        <ImagesPreview Vidframes={Vidframes} />
        <CoverPreviewVid
          vidUrl={file.vidUrl}
          containerRef={framesContainerRef}
        />
      </div>
    </div>
  );
}

function CoverPreviewVid({
  vidUrl,
  containerRef,
}: {
  vidUrl: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const thumbSliderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pointerDownHandler, pointerUpHandler, pointerMoveHandler } =
    usePointerHandlers({ thumbSliderRef, containerRef, videoRef });
  return (
    <div
      onPointerDown={pointerDownHandler}
      onPointerUp={pointerUpHandler}
      onPointerMove={pointerMoveHandler}
      ref={thumbSliderRef}
      className={styles.thumbnailPreview}
    >
      <video ref={videoRef} src={vidUrl}></video>
    </div>
  );
}

function usePointerHandlers({
  thumbSliderRef,
  containerRef,
  videoRef,
}: {
  thumbSliderRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const cords = useRef({
    startX: 0,
    slidPosition: 0,
  });

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

function getTranslateXValue(element: HTMLElement) {
  const matrex = window.getComputedStyle(element).getPropertyValue("transform");
  const matrexArr = matrex.split(", ");
  return parseInt(matrexArr[4]);
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
