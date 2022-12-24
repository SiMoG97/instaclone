import { ARStateType, ImgFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";

type EditProps = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
  nextFile: () => void;
  prevFile: () => void;
  aspectRatio: ARStateType;
};

export function EditStep({
  files,
  setFiles,
  aspectRatio,
  nextFile,
  prevFile,
}: EditProps) {
  return (
    <div className={styles.EditStep}>
      <div className={styles.canvasContainer}>
        <canvas
          // width="830"
          // height="830"
          style={
            aspectRatio === "original"
              ? originalArCalcul(
                  files[0].img.naturalWidth,
                  files[0].img.naturalHeight
                )
              : {}
          }
          className={`${aspectRatio !== "original" ? styles[aspectRatio] : ""}`}
        ></canvas>
      </div>
    </div>
  );
}
