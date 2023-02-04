import { useEffect, useRef } from "react";
import { getFramesFromVid } from "../../utils";
import Image from "next/image";
import styles from "../../../popup.module.scss";

type CommonPropsT = {
  frameTime: number;
  vidUrl: string;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PreviewSelectedCover({
  isPaused,
  frameTime,
  vidUrl,
  setIsPaused,
}: CommonPropsT & { isPaused: boolean }) {
  const coverPreviewRef = useRef<HTMLDivElement>(null);

  usePreviewCoverFrame({ coverPreviewRef, frameTime, vidUrl, setIsPaused });
  return (
    <div
      className={styles.videoCoverPreview}
      ref={coverPreviewRef}
      style={isPaused ? { display: "flex" } : { display: "none" }}
    >
      <div className={styles.playBtnImg}>
        <Image src="/play.png" layout="fill" alt="Play button image" />
      </div>
    </div>
  );
}

function usePreviewCoverFrame({
  coverPreviewRef,
  frameTime,
  vidUrl,
  setIsPaused,
}: CommonPropsT & {
  coverPreviewRef: React.RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    (async () => {
      if (!coverPreviewRef.current) return;
      setIsPaused(() => true);
      const cover = await getFramesFromVid({ frameTime, vidUrl });
      coverPreviewRef.current.style.backgroundImage = `url("${cover}")`;
    })();
  }, [frameTime]);
}
