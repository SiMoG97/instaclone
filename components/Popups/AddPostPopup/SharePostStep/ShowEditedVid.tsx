import { useRef, useState } from "react";
import { ARStateType, VidToUp } from "..";
import { CalcOriginal } from "../EditStep";
import styles from "../../popup.module.scss";
import { PreviewSelectedCover } from "../EditStep/VideoPreview/PreviewSelectedCover";
import { Video } from "../EditStep/VideoPreview/Video";

type ShowEditedVidT = {
  aspectRatio: ARStateType;
  //   isPaused: boolean;
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
  return (
    <Video
      vidRef={vidRef}
      img={vidToUp.img}
      aspectRatio={aspectRatio}
      coverTime={vidToUp.coverTime}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      sound={vidToUp.sound}
      vidUrl={vidToUp.src}
      x={vidToUp.x}
      y={vidToUp.y}
      startsAt={vidToUp.startsAt}
      endsAt={vidToUp.endsAt}
      setVidCurrTime={setVidCurrTime}
    />
  );
}
