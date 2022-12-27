import { PointerEvent, useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";

type RangeSlideProps = {
  setedValue?: number;
  startFrom: "left" | "mid";
  thumbColor?: string;
  lineColor?: string;
  className?: string;
  thumbSize?: string;
  changeHandler: (scaleValue: number) => any;
  pointerUp?: () => void;
};

type InputTargetType = {
  target: EventTarget & HTMLInputElement;
};
function RangeSlide({
  setedValue = 0,
  startFrom = "left",
  className = "",
  thumbColor = "var(--txt-c-1)",
  lineColor = "var(--txt-c-3)",
  thumbSize = "2rem",
  changeHandler,
  pointerUp,
}: RangeSlideProps) {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [rangeValue, setRangeValue] = useState(setedValue);

  const defaultRangeStyle = () => {
    if (!rangeRef.current) return;
    if (startFrom === "left") {
      rangeRef.current.style.background = `linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} ${setedValue}%, ${lineColor} ${setedValue}%, ${lineColor} 100%)`;
    } else {
      rangeRef.current.style.background = `linear-gradient(to right,${lineColor} 0%,${lineColor} 50%,${thumbColor} 50%,${thumbColor} 50%,${lineColor} 50%,${lineColor} 100%)`;
    }
  };
  useEffect(() => {
    if (!rangeRef.current) return;
    document.documentElement.style.setProperty("--thumbColor", thumbColor);
    document.documentElement.style.setProperty("--thumbSize", thumbSize);
    defaultRangeStyle();
  }, [lineColor, thumbColor, startFrom, thumbSize]);

  useEffect(() => {
    if (!rangeRef.current || setedValue !== 0) return;
    rangeRef.current.value = "0";
    setRangeValue(() => 0);
    defaultRangeStyle();
  }, [setedValue]);

  const midRangeHandler = ({ target }: InputTargetType) => {
    const value = Number(target.value);
    const gradientValues = {
      lineLeft: 50,
      thumbLeft: 50,
      lineRight: 50,
      thumbRight: 50,
    };
    const percentage = (value + 100) / 2;
    if (value > 0) {
      gradientValues.lineRight = percentage;
      gradientValues.thumbRight = percentage;
    } else {
      gradientValues.lineLeft = percentage;
      gradientValues.thumbLeft = percentage;
    }
    target.style.background = `linear-gradient(to right,${lineColor} 0%,${lineColor} ${gradientValues.lineLeft}%,${thumbColor} ${gradientValues.thumbLeft}%,${thumbColor} ${gradientValues.thumbRight}%,${lineColor} ${gradientValues.lineRight}%,${lineColor} 100%)`;
    setRangeValue(() => Number(target.value));
    changeHandler(Number(target.value));
  };
  const leftRangeHandler = ({ target }: InputTargetType) => {
    target.style.background = `linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} ${target.value}%, ${lineColor} ${target.value}%, ${lineColor} 100%)`;
    setRangeValue(() => Number(target.value));
    changeHandler(Number(target.value));
  };

  const handlePointerUp = () => {
    if (!pointerUp) return;
    pointerUp();
  };

  const handleChange =
    startFrom === "left" ? leftRangeHandler : midRangeHandler;

  return (
    <input
      ref={rangeRef}
      type="range"
      value={`${rangeValue}`}
      className={`${styles.inputRange} ${className} ${
        startFrom === "left" ? styles.left : styles.mid
      }`}
      onPointerUp={handlePointerUp}
      onChange={handleChange}
      {...(startFrom === "mid" && { min: "-100" })}
    />
  );
}

export default RangeSlide;
