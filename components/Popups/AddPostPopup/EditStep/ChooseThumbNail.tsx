import { useEffect, useRef } from "react";
import { ImgVidFileType } from "..";
import styles from "../../popup.module.scss";
import { videosFramesT } from "./EditSideBar";
import { ImagesPreview } from "./ImagesPreview";

type ChooseThumbNailType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
};

export function ChooseThumbNail({ file, Vidframes }: ChooseThumbNailType) {
  return (
    <div className={styles.chooseThumbnailContainer}>
      <h3 className={styles.editSectionTitle}>Cover photo</h3>
      <div className={styles.thumbnailPreview}></div>
      <ImagesPreview Vidframes={Vidframes} />
    </div>
  );
}
