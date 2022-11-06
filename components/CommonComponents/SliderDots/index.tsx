import { CSSProperties } from "react";
import styles from "./Slider.module.scss";

export function SliderDots({ nbrOfDots, selectedDot, style }: SliderDotsProps) {
  if (nbrOfDots === 1) {
    return null;
  }
  return (
    <div className={styles.SliderDotsContainer} style={style}>
      {Array.from(Array(nbrOfDots).keys()).map((nbr, i) => (
        <div
          key={nbr.toString()}
          className={`${styles.dots} ${i === selectedDot ? styles.active : ""}`}
        ></div>
      ))}
    </div>
  );
}
type SliderDotsProps = {
  nbrOfDots: number;
  selectedDot: number;
  style?: CSSProperties;
};
