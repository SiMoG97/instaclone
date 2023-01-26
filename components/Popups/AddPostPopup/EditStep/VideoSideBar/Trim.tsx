import React, { useEffect, useRef } from "react";
import { ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { videosFramesT } from "../EditSideBar";
import { ImagesPreview } from "./ImagesPreview";
import {
  useCurrTimeIndicatorPosition,
  useInitControlPositions,
  usePointerEventHandlers,
} from "./TrimLogic";

export type ControlValuesT = {
  lThumbX: number;
  rThumbX: number;
  thumbW: number;
  leftAreaW: number;
  rightAreaW: number;
  oneSecGap: number;
};

type TrimType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
  updateVideoStartAndEnd(newFile: ImgVidFileType): void;
  vidCurrTime: number;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Trim({
  file,
  Vidframes,
  updateVideoStartAndEnd,
  vidCurrTime,
  isPaused,
  setIsPaused,
}: TrimType) {
  const selectedArea = useRef<HTMLDivElement>(null);
  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftAreaRef = useRef<HTMLDivElement>(null);
  const rightAreaRef = useRef<HTMLDivElement>(null);
  const timeIndicatorRef = useRef<HTMLDivElement>(null);
  const controls = useRef<ControlValuesT>({
    lThumbX: 0,
    rThumbX: 0,
    thumbW: 0,
    leftAreaW: 0,
    rightAreaW: 0,
    oneSecGap: 0,
  });

  useInitControlPositions({
    file,
    containerRef,
    leftAreaRef,
    leftThumbRef,
    rightAreaRef,
    rightThumbRef,
    selectedArea,
    controls,
  });

  const { pointerDownHandler, pointerUpHandler, pointerMoveHandler } =
    usePointerEventHandlers({
      file,
      containerRef,
      leftThumbRef,
      leftAreaRef,
      rightThumbRef,
      rightAreaRef,
      selectedArea,
      controls,
      updateVideoStartAndEnd,
      setIsPaused,
    });

  useCurrTimeIndicatorPosition({
    file,
    controls,
    timeIndicatorRef,
    vidCurrTime,
    containerRef,
    isPaused,
  });
  return (
    <div className={styles.Trim}>
      <h3 className={styles.editSectionTitle}>Trim</h3>
      <div className={styles.trimTimeline}>
        <ImagesPreview Vidframes={Vidframes} />
        <div className={styles.videoRangeContainer} ref={containerRef}>
          <div className={styles.controlsContainer}>
            <div className={styles.darkAreaContainer}>
              <div
                className={`${styles.leftArea} ${styles.darkArea}`}
                ref={leftAreaRef}
              ></div>
              <div
                className={`${styles.rightArea} ${styles.darkArea}`}
                ref={rightAreaRef}
              ></div>
            </div>
            <div
              className={`${styles.thumb} ${styles.leftThumb}`}
              ref={leftThumbRef}
              onPointerDown={pointerDownHandler}
              onPointerUp={pointerUpHandler}
              onPointerMove={pointerMoveHandler}
            >
              <div data-curr-time=""></div>
            </div>
            <div className={styles.selectedRange} ref={selectedArea}></div>
            {!isPaused ? (
              <div
                className={styles.timeIndicator}
                ref={timeIndicatorRef}
              ></div>
            ) : null}
            <div
              className={`${styles.thumb} ${styles.rightThumb}`}
              ref={rightThumbRef}
              onPointerDown={pointerDownHandler}
              onPointerUp={pointerUpHandler}
              onPointerMove={pointerMoveHandler}
            >
              <div data-curr-time=""></div>
            </div>
          </div>
        </div>
      </div>
      <BottomTimeTrim duration={file.duration} />
    </div>
  );
}

function BottomTimeTrim({ duration }: { duration: number }) {
  return (
    <div className={styles.trimTime}>
      {Array.from({ length: 9 }, (_, i) => i).map((_, i) => (
        <div
          className={styles.dots}
          key={i}
          data-time={`${((duration / 9) * i) | 0}s`}
        ></div>
      ))}
    </div>
  );
}
