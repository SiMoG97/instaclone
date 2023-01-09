import styles from "../../popup.module.scss";

export const Grid = ({ isPointerDown }: { isPointerDown: boolean }) => {
  return (
    <div className={styles.grid} style={isPointerDown ? { opacity: 1 } : {}}>
      <div className={styles.line} style={{ top: `${100 / 3}%` }}></div>
      <div className={styles.line} style={{ top: `${(100 / 3) * 2}%` }}></div>
      <div
        className={`${styles.line} ${styles.horizontal}`}
        style={{ left: `${100 / 3}%` }}
      ></div>
      <div
        className={`${styles.line} ${styles.horizontal}`}
        style={{ left: `${(100 / 3) * 2}%` }}
      ></div>
    </div>
  );
};
