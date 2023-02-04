import { useEffect } from "react";
import { ImgVidFileType } from "../..";
import useWindowEventHandler from "../../../../../Hooks/useWindowEventHandler";
import { widthAndHeightCalc } from "../../utils";

export function usePositionVid(
  file: ImgVidFileType,
  previewContainerRef: React.RefObject<HTMLDivElement>,
  vidRef: React.RefObject<HTMLVideoElement>
) {
  function positionVid() {
    if (
      file.type !== "video" ||
      !previewContainerRef.current ||
      !vidRef.current
    )
      return;
    const { img, x, y } = file;
    const imgAR = img.naturalWidth / img.naturalHeight;
    const preview = previewContainerRef.current;
    const [parentW, parentH] = [preview.offsetWidth, preview.offsetHeight];
    const { w, h } = widthAndHeightCalc({ parentW, parentH }, imgAR);
    vidRef.current.style.width = `${w}px`;
    vidRef.current.style.height = `${h}px`;
    vidRef.current.style.transform = `translate(${x}%,${y}%)`;
  }
  useEffect(() => {
    positionVid();
  }, [file.id]);
  useWindowEventHandler(positionVid, [file]);
}

type LoopVidT = {
  file: ImgVidFileType;
  vidRef: React.RefObject<HTMLVideoElement>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
};
export function useLoopVideoFromstartToEnd({
  file,
  vidRef,
  isPaused,
  setIsPaused,
  setVidCurrTime,
}: LoopVidT) {
  // if the user change the video stop the current video
  useEffect(() => {
    setIsPaused(() => true);
  }, [file.id]);

  useEffect(() => {
    if (!vidRef.current) return;
    vidRef.current.currentTime = file.startsAt;
  }, [file.startsAt, file.endsAt]);

  useEffect(() => {
    if (!vidRef.current || isPaused) return;
    if (vidRef.current.currentTime < file.startsAt) {
      vidRef.current.currentTime = file.startsAt;
      setVidCurrTime(() => file.startsAt);
    }
    const myInterval = setInterval(() => {
      if (!vidRef.current) return;
      if (
        naiveRound(vidRef.current.currentTime, 1) >= naiveRound(file.endsAt, 1)
      ) {
        vidRef.current.currentTime = file.startsAt;
        setVidCurrTime(() => file.startsAt);
      } else {
        const currTime = vidRef.current.currentTime;
        setVidCurrTime(() => currTime);
      }
    }, 20);
    return () => {
      clearInterval(myInterval);
    };
  }, [file.id, file.startsAt, file.endsAt, vidRef.current, isPaused]);
}
// one number after the comma
function naiveRound(num: number, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}
