import { useEffect, useState } from "react";
import { ImgVidFileType } from "../..";
import useThrottle from "../../../../../Hooks/useThrottle";
import useWindowEventHandler from "../../../../../Hooks/useWindowEventHandler";
import { ControlValuesT } from "./Trim";

type ControlsT = React.MutableRefObject<ControlValuesT>;

function calcLeftArea(
  containerRef: DivRefT,
  leftThumbRef: DivRefT,
  leftAreaRef: DivRefT,
  selectedArea: DivRefT,
  controls: ControlsT,
  clientX: number,
  duration: number
) {
  if (
    !containerRef.current ||
    !leftAreaRef.current ||
    !leftThumbRef.current ||
    !selectedArea.current
  )
    return;
  const { x: containerX, width: containerW } =
    containerRef.current.getBoundingClientRect();
  const { rThumbX, oneSecGap, thumbW } = controls.current;
  let lThumbPos = clientX - containerX;
  if (lThumbPos <= 0) {
    lThumbPos = 0;
  } else if (rThumbX - lThumbPos <= oneSecGap) {
    lThumbPos = rThumbX - oneSecGap + thumbW;
  }
  leftThumbRef.current.style.left = `${lThumbPos}px`;
  leftAreaRef.current.style.width = `${lThumbPos}px`;
  if (leftThumbRef.current.firstChild) {
    const child = leftThumbRef.current.firstChild as HTMLDivElement;
    child.dataset.currTime = formatTime(
      fromPxToTime(lThumbPos, duration, containerW)
    );
  }
  selectedArea.current.style.left = `${lThumbPos + thumbW}px`;
  selectedArea.current.style.width = `${rThumbX - thumbW - lThumbPos}px`;
  controls.current.lThumbX = lThumbPos;
  controls.current.leftAreaW = lThumbPos;
}
function calcRightArea(
  containerRef: DivRefT,
  rightThumbRef: DivRefT,
  rightAreaRef: DivRefT,
  selectedArea: DivRefT,
  controls: ControlsT,
  clientX: number,
  duration: number
) {
  if (
    !containerRef.current ||
    !rightAreaRef.current ||
    !rightThumbRef.current ||
    !selectedArea.current
  )
    return;
  const { x: containerX, width: containerW } =
    containerRef.current.getBoundingClientRect();

  const { lThumbX, oneSecGap, thumbW } = controls.current;
  let rThumbPos = clientX - containerX;
  if (rThumbPos >= containerW - thumbW) {
    rThumbPos = containerW - thumbW;
  } else if (rThumbPos <= lThumbX + oneSecGap) {
    rThumbPos = lThumbX + oneSecGap - thumbW;
  }
  const rAreaW = containerW - rThumbPos - thumbW;
  rightThumbRef.current.style.left = `${rThumbPos}px`;
  if (rightThumbRef.current.firstChild) {
    const child = rightThumbRef.current.firstChild as HTMLDivElement;
    child.dataset.currTime = formatTime(
      fromPxToTime(rThumbPos, duration, containerW)
    );
  }
  rightAreaRef.current.style.width = `${rAreaW}px`;
  selectedArea.current.style.left = `${lThumbX + thumbW}px`;
  selectedArea.current.style.width = `${rThumbPos - thumbW - lThumbX}px`;
  controls.current.rThumbX = rThumbPos;
  controls.current.rightAreaW = rAreaW;
}
function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);

  let strMin = `${minutes < 10 ? "0" + minutes : minutes}`;
  let strSec = `${secs < 10 ? "0" + secs : secs}`;

  return strMin + ":" + strSec;
}
function fromPxToTime(pos: number, duration: number, containerW: number) {
  return (pos * duration) / containerW;
}
function thumbPositionCalc(duration: number, containerW: number, time: number) {
  return (time * containerW) / duration;
}
function oneSecGapCalc(duration: number, containerW: number) {
  return containerW / duration;
}
function fromTimeToPx() {}
type PointerT = React.PointerEvent<HTMLDivElement>;
type DivRefT = React.RefObject<HTMLDivElement>;

type TrimRefsType = {
  file: ImgVidFileType;
  containerRef: DivRefT;
  leftThumbRef: DivRefT;
  leftAreaRef: DivRefT;
  rightThumbRef: DivRefT;
  rightAreaRef: DivRefT;
  selectedArea: DivRefT;
  controls: ControlsT;
};
type PointerHandlersT = TrimRefsType & {
  updateVideoStartAndEnd(newFile: ImgVidFileType): void;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

export function usePointerEventHandlers({
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
}: PointerHandlersT) {
  const [pointerDown, setPointerDown] = useState(false);

  function pointerDownHandler(e: PointerT) {
    if (!leftThumbRef.current || !rightThumbRef.current) return;

    setPointerDown(() => true);
    setIsPaused(() => true);
    if (leftThumbRef.current === e.target) {
      leftThumbRef.current.setPointerCapture(e.pointerId);
    } else {
      rightThumbRef.current.setPointerCapture(e.pointerId);
    }
  }

  function pointerUpHandler() {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    setPointerDown(() => false);
    setIsPaused(() => false);
    const { lThumbX, rThumbX, thumbW } = controls.current;
    const startsAt = fromPxToTime(lThumbX, file.duration, containerW);
    const endsAt = fromPxToTime(rThumbX + thumbW, file.duration, containerW);
    const newFile: ImgVidFileType = { ...file, startsAt, endsAt };
    updateVideoStartAndEnd(newFile);
  }

  const pointerMoveHandler = useThrottle<PointerT>((e: PointerT) => {
    if (!pointerDown) return;
    if (e.target === leftThumbRef.current) {
      calcLeftArea(
        containerRef,
        leftThumbRef,
        leftAreaRef,
        selectedArea,
        controls,
        e.clientX,
        file.duration
      );
    } else {
      calcRightArea(
        containerRef,
        rightThumbRef,
        rightAreaRef,
        selectedArea,
        controls,
        e.clientX,
        file.duration
      );
    }
  }, 50);
  return {
    pointerDownHandler,
    pointerUpHandler,
    pointerMoveHandler,
  };
}

type ControlPositionsT = TrimRefsType;

export function useInitControlPositions({
  file,
  containerRef,
  leftThumbRef,
  leftAreaRef,
  rightThumbRef,
  rightAreaRef,
  selectedArea,
  controls,
}: ControlPositionsT) {
  function initControlsCords() {
    if (
      !leftThumbRef.current ||
      !rightThumbRef.current ||
      !containerRef.current ||
      !leftAreaRef.current ||
      !rightAreaRef.current ||
      !selectedArea.current
    )
      return;
    const { width: containerW } = containerRef.current.getBoundingClientRect();
    const thumbW = leftThumbRef.current.getBoundingClientRect().width;
    const LthumbP = thumbPositionCalc(file.duration, containerW, file.startsAt);
    const RthumbP =
      thumbPositionCalc(file.duration, containerW, file.endsAt) - thumbW;
    controls.current.oneSecGap = oneSecGapCalc(file.duration, containerW);
    controls.current.thumbW = thumbW;

    leftThumbRef.current.style.left = `${LthumbP}px`;
    leftThumbRef.current.dataset.currTime = formatTime(file.startsAt);
    leftAreaRef.current.style.width = `${LthumbP}px`;
    if (leftThumbRef.current.firstChild) {
      const child = leftThumbRef.current.firstChild as HTMLDivElement;
      child.dataset.currTime = formatTime(file.startsAt);
    }

    controls.current.lThumbX = LthumbP;
    controls.current.leftAreaW = LthumbP;

    rightThumbRef.current.style.left = `${RthumbP}px`;
    rightThumbRef.current.dataset.currTime = formatTime(file.endsAt);
    rightAreaRef.current.style.width = `${containerW - RthumbP - thumbW}px`;
    if (rightThumbRef.current.firstChild) {
      const child = rightThumbRef.current.firstChild as HTMLDivElement;
      child.dataset.currTime = formatTime(file.endsAt);
    }
    controls.current.rThumbX = RthumbP;
    controls.current.rightAreaW = containerW - RthumbP - thumbW;

    selectedArea.current.style.left = `${LthumbP + thumbW}px`;
    selectedArea.current.style.width = `${RthumbP - thumbW - LthumbP}px`;
  }

  useWindowEventHandler(initControlsCords, [
    file,
    containerRef.current,
    leftThumbRef.current,
    leftAreaRef.current,
    rightThumbRef.current,
    rightAreaRef.current,
    controls.current,
  ]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!containerRef.current) return;
      initControlsCords();
    }, 300);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [file.id]);
}

export function useCurrTimeIndicatorPosition({
  file,
  controls,
  timeIndicatorRef,
  vidCurrTime,
  containerRef,
  isPaused,
}: {
  file: ImgVidFileType;
  containerRef: DivRefT;
  controls: ControlsT;
  timeIndicatorRef: React.RefObject<HTMLDivElement>;
  vidCurrTime: number;
  isPaused: boolean;
}) {
  function timeIndicPos() {
    if (!timeIndicatorRef.current || !containerRef.current) return;
    const { width: containerW } = containerRef.current.getBoundingClientRect();
    const trimedDur = file.endsAt - file.startsAt;
    const { leftAreaW, rightAreaW } = controls.current;
    const trimedPartWidth = containerW - (leftAreaW + rightAreaW);
    const currentIndicX = (vidCurrTime * trimedPartWidth) / trimedDur;

    timeIndicatorRef.current.style.left = `${currentIndicX}px`;
  }
  useEffect(() => {
    if (isPaused) return;
    timeIndicPos();
  }, [isPaused]);
  useEffect(() => {
    timeIndicPos();
  }, [vidCurrTime, file.endsAt, file.startsAt]);
}
