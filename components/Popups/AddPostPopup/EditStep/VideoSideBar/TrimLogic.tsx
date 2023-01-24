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
  clientX: number
) {
  if (
    !containerRef.current ||
    !leftAreaRef.current ||
    !leftThumbRef.current ||
    !selectedArea.current
  )
    return;
  const { x: containerX } = containerRef.current.getBoundingClientRect();
  const { rThumbX, oneSecGap, thumbW } = controls.current;
  let lThumbPos = clientX - containerX;
  if (lThumbPos <= 0) {
    lThumbPos = 0;
  } else if (rThumbX - lThumbPos <= oneSecGap) {
    lThumbPos = rThumbX - oneSecGap + thumbW;
  }
  leftThumbRef.current.style.left = `${lThumbPos}px`;
  leftAreaRef.current.style.width = `${lThumbPos}px`;
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
  clientX: number
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
  rightAreaRef.current.style.width = `${rAreaW}px`;
  selectedArea.current.style.left = `${lThumbX + thumbW}px`;
  selectedArea.current.style.width = `${rThumbPos - thumbW - lThumbX}px`;
  controls.current.rThumbX = rThumbPos;
  controls.current.rightAreaW = rAreaW;
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
}: PointerHandlersT) {
  const [pointerDown, setPointerDown] = useState(false);

  function pointerDownHandler(e: PointerT) {
    if (!leftThumbRef.current || !rightThumbRef.current) return;

    setPointerDown(() => true);
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
        e.clientX
      );
    } else {
      calcRightArea(
        containerRef,
        rightThumbRef,
        rightAreaRef,
        selectedArea,
        controls,
        e.clientX
      );
    }
  }, 30);
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
    leftAreaRef.current.style.width = `${LthumbP}px`;
    controls.current.lThumbX = LthumbP;
    controls.current.leftAreaW = LthumbP;

    rightThumbRef.current.style.left = `${RthumbP}px`;
    rightAreaRef.current.style.width = `${containerW - RthumbP - thumbW}px`;
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
