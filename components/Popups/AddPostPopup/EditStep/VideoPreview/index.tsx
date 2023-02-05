import { useEffect, useRef } from "react";
import { ARStateType, ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { CalcOriginal } from "..";
import { PreviewSelectedCover } from "./PreviewSelectedCover";
import {
  FileT,
  useLoopVideoFromstartToEnd,
  usePositionVid,
} from "./VideoPreviewLogic";
import { Video } from "./Video";

type videoPreviewType = {
  file: ImgVidFileType;
  aspectRatio: ARStateType;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};
export function VideoPreview({
  file,
  aspectRatio,
  setVidCurrTime,
  isPaused,
  setIsPaused,
}: videoPreviewType) {
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPaused(() => true);
  }, [file.coverTime]);

  return (
    <Video
      vidRef={vidRef}
      img={file.img}
      aspectRatio={aspectRatio}
      coverTime={file.coverTime}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      sound={file.sound}
      vidUrl={file.vidUrl}
      x={file.x}
      y={file.y}
      startsAt={file.startsAt}
      endsAt={file.endsAt}
      setVidCurrTime={setVidCurrTime}
    />
    // <div
    //   ref={previewContainerRef}
    //   style={
    //     aspectRatio === "original"
    //       ? {
    //           ...CalcOriginal(file.img.naturalWidth, file.img.naturalHeight),
    //         }
    //       : {}
    //   }
    //   className={`${styles.previewVidContainer} ${
    //     aspectRatio !== "original"
    //       ? `${styles[aspectRatio]} ${styles.responsive}`
    //       : ""
    //   }`}
    // >
    //   <video
    //     loop
    //     autoPlay={false}
    //     muted={!file.sound}
    //     ref={vidRef}
    //     src={file.vidUrl}
    //     onPointerUp={togglePause}
    //   ></video>
    //   <PreviewSelectedCover
    //     isPaused={isPaused}
    //     frameTime={file.coverTime}
    //     vidUrl={file.vidUrl}
    //     setIsPaused={setIsPaused}
    //   />
    // </div>
  );
}
