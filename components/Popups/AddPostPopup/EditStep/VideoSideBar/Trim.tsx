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
      <div>
        <ImagesPreview Vidframes={Vidframes} />
        <div className={styles.trimTime}>
          {Array.from({ length: 9 }, (_, i) => i).map((_, i) => (
            <div
              className={styles.dots}
              key={i}
              data-time={`${((file.duration / 9) * i) | 0}s`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
