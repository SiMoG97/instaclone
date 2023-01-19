import { useEffect, useRef } from "react";
import { ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { videosFramesT } from "../EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type TrimType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
};

export default function Trim({ file, Vidframes }: TrimType) {
  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftAreaRef = useRef<HTMLDivElement>(null);
  const rightAreaRef = useRef<HTMLDivElement>(null);
  const controls = useRef({
    lThumbX: 0,
    rThumbX: 0,
    leftAreaW: 0,
    rightAreaW: 0,
  });
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!containerRef.current) return;
      initControlsCords();
    }, 300);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  function initControlsCords() {
    if (
      !leftThumbRef.current ||
      !rightThumbRef.current ||
      !containerRef.current ||
      !leftAreaRef.current ||
      !rightAreaRef.current
    )
      return;
    const { x: containerX, width: containerW } =
      containerRef.current.getBoundingClientRect();
    const thumbW = leftThumbRef.current.getBoundingClientRect().width;
    const lThmbX = leftThumbRef.current.getBoundingClientRect().x - containerX;
    const rThumbX =
      rightThumbRef.current.getBoundingClientRect().x - containerX;

    console.log("containerX", containerX);
    console.log("containerW", containerW);
    console.log("lThmbX", lThmbX);
    console.log("rThumbX", rThumbX);
    console.log("thumbW", thumbW);
  }
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
            >
              <div></div>
            </div>
            <div className={styles.selectedRange}></div>
            <div
              className={`${styles.thumb} ${styles.rightThumb}`}
              ref={rightThumbRef}
            >
              <div></div>
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

function calcLeftArea() {
  console.log("hmmmmm");
}
function calcRightArea() {
  console.log("hmmmmm");
}
function fromPxToTime() {
  console.log("hmmmmm");
}
function fromTimeToPx() {
  console.log("hmmmmm");
}
