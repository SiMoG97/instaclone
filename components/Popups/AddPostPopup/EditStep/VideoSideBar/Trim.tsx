import { ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { videosFramesT } from "../EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type TrimType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
};

export default function Trim({ file, Vidframes }: TrimType) {
  return (
    <div className={styles.Trim}>
      <h3 className={styles.editSectionTitle}>Trim</h3>
      <div className={styles.trimTimeline}>
        <ImagesPreview Vidframes={Vidframes} />
        <div className={styles.videoRangeContainer}>
          <div className={`${styles.startsFrom} ${styles.darkArea}`}>
            <div className={`${styles.thumb} ${styles.leftThumb}`}></div>
          </div>
          <div className={styles.selectedRange}></div>
          <div className={`${styles.endsAt} ${styles.darkArea}`}>
            <div className={`${styles.thumb} ${styles.rightThumb}`}></div>
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
