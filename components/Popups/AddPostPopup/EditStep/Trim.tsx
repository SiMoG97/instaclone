import styles from "../../popup.module.scss";
import { videosFramesT } from "./EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type TrimType = {
  Vidframes: videosFramesT;
};

export default function Trim({ Vidframes }: TrimType) {
  return (
    <div className={styles.Trim}>
      <h3 className={styles.editSectionTitle}>Trim</h3>
      <ImagesPreview Vidframes={Vidframes} />
    </div>
  );
}
