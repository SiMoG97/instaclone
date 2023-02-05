import { useEffect } from "react";
import { ImgVidFileType } from "../..";
import useWindowEventHandler from "../../../../../Hooks/useWindowEventHandler";
import { widthAndHeightCalc } from "../../utils";

export type FileT = {
  type: "video";
  img: HTMLImageElement;
  x: number;
  y: number;
  vidUrl: string;
};
export function usePositionVid(
  file: FileT,
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
  }, [file.vidUrl]);
  useWindowEventHandler(positionVid, [file.vidUrl]);
}

type LoopVidT = {
  // file: ImgVidFileType;
  startsAt: number;
  endsAt: number;
  vidUrl: string;
  vidRef: React.RefObject<HTMLVideoElement>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setVidCurrTime: React.Dispatch<React.SetStateAction<number>>;
};
export function useLoopVideoFromstartToEnd({
  // file,
  startsAt,
  endsAt,
  vidUrl,
  vidRef,
  isPaused,
  setIsPaused,
  setVidCurrTime,
}: LoopVidT) {
  // if the user change the video stop the current video
  useEffect(() => {
    setIsPaused(() => true);
  }, [vidUrl]);

  useEffect(() => {
    if (!vidRef.current) return;
    vidRef.current.currentTime = startsAt;
  }, [startsAt, endsAt]);

  // useLoopVideo();
  useEffect(() => {
    if (!vidRef.current || isPaused) return;
    if (vidRef.current.currentTime < startsAt) {
      vidRef.current.currentTime = startsAt;
      setVidCurrTime(() => startsAt);
    }
    const myInterval = setInterval(() => {
      if (!vidRef.current) return;
      if (naiveRound(vidRef.current.currentTime, 1) >= naiveRound(endsAt, 1)) {
        vidRef.current.currentTime = startsAt;
        setVidCurrTime(() => startsAt);
      } else {
        const currTime = vidRef.current.currentTime;
        setVidCurrTime(() => currTime);
      }
    }, 20);
    return () => {
      clearInterval(myInterval);
    };
  }, [vidUrl, startsAt, endsAt, vidRef.current, isPaused]);
}

// function useLoopVideo() {
//   useEffect(() => {
//     console.log("hmmmm");
//   }, []);
//   useEffect(() => {
//     if (!vidRef.current || isPaused) return;
//     if (vidRef.current.currentTime < file.startsAt) {
//       vidRef.current.currentTime = file.startsAt;
//       setVidCurrTime(() => file.startsAt);
//     }
//     const myInterval = setInterval(() => {
//       if (!vidRef.current) return;
//       if (
//         naiveRound(vidRef.current.currentTime, 1) >= naiveRound(file.endsAt, 1)
//       ) {
//         vidRef.current.currentTime = file.startsAt;
//         setVidCurrTime(() => file.startsAt);
//       } else {
//         const currTime = vidRef.current.currentTime;
//         setVidCurrTime(() => currTime);
//       }
//     }, 20);
//     return () => {
//       clearInterval(myInterval);
//     };
//   }, [file.id, file.startsAt, file.endsAt, vidRef.current, isPaused]);
// }
// one number after the comma
function naiveRound(num: number, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}
