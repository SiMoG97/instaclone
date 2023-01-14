import { useEffect, useRef } from "react";
import { ImgVidFileType } from "..";
import styles from "../../popup.module.scss";
import { videosFramesT } from "./EditSideBar";

type ChooseThumbNailType = {
  file: ImgVidFileType;
  Vidframes: videosFramesT;
};

export function ChooseThumbNail({ file, Vidframes }: ChooseThumbNailType) {
  return (
    <div className={styles.chooseThumbnailContainer}>
      <div className={styles.thumbnailPreview}></div>
      <ImagesPreview Vidframes={Vidframes} />
    </div>
  );
}

function ImagesPreview({ Vidframes }: { Vidframes: videosFramesT }) {
  return (
    <div className={styles.thumbnailFrames}>
      {Vidframes.frames.map((frame, i) => (
        <OneFrame key={frame} frameUrl={frame} />
      ))}
    </div>
  );
}
function OneFrame({ frameUrl }: { frameUrl: string }) {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.style.backgroundImage = `url(${frameUrl})`;
  }, []);
  return <div ref={imgRef} className={styles.oneFrame}></div>;
}
