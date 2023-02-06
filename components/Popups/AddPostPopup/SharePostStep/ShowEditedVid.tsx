import { useRef, useState } from "react";
import { ARStateType, VidToUp } from "..";
import { Video } from "../EditStep/VideoPreview/Video";

type ShowEditedVidT = {
  aspectRatio: ARStateType;
  vidToUp: VidToUp;
};
export function ShowEditedVid({
  aspectRatio,
  vidToUp,
}: //   isPaused,
ShowEditedVidT) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [_, setVidCurrTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  if (!vidToUp) return <></>;
  const { type, duration, ...vidFile } = vidToUp;
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
