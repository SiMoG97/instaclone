import { useEffect, useRef } from "react";
import { ARStateType, ImgVidFileType } from "../..";
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
  const { type, duration, adjustSettings, filter, scale, ...vidFile } = file;

  return (
    <Video
      vidRef={vidRef}
      aspectRatio={aspectRatio}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      setVidCurrTime={setVidCurrTime}
      vidFile={vidFile}
    />
  );
}
