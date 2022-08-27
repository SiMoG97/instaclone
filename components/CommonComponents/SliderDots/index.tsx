import styles from "./Slider.module.scss";

// `url("${url.replace(/(\r\n|\n|\r)/gm, "")}")`;
export function SliderDots({ nbrOfDots, selectedDot }: SliderDotsProps) {
  if (nbrOfDots === 1) {
    return null;
  }
  return (
    <div className={styles.SliderDotsContainer}>
      {Array.from(Array(nbrOfDots).keys()).map((_, i) => (
        <div
          key={i}
          className={`${styles.dots} ${i === selectedDot ? styles.active : ""}`}
        ></div>
      ))}
    </div>
  );
}
type SliderDotsProps = {
  nbrOfDots: number;
  selectedDot: number;
};
