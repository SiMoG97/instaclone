import { ARStateType } from "..";

export function CanvasWidthHeight(
  ar: ARStateType,
  image: HTMLImageElement
): { width: number; height: number } {
  const normalWidth = 600;
  if (ar === "original") {
    let imgAr = image.width / image.height;
    if (imgAr > 1.91) {
      imgAr = 1.91;
    } else if (imgAr < 0.8) {
      imgAr = 0.8;
    }
    if (imgAr > 1) {
      return {
        width: normalWidth,
        height: normalWidth / imgAr,
      };
    } else if (imgAr < 1) {
      return {
        width: normalWidth * imgAr,
        height: normalWidth,
      };
    }
  } else if (ar === "sixteenToNine") {
    return {
      width: normalWidth,
      height: normalWidth / (16 / 9),
    };
  } else if (ar === "fourToFive") {
    return {
      width: normalWidth * (4 / 5),
      height: normalWidth,
    };
  }
  return {
    width: normalWidth,
    height: normalWidth,
  };
}

type GetFramesFromVidType = {
  vidUrl: string;
  frameTime: number;
};
export const getFramesFromVid = ({
  frameTime,
  vidUrl,
}: GetFramesFromVidType) => {
  const video = document.createElement("video");
  video.src = vidUrl;
  video.addEventListener("loadeddata", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    video.currentTime = frameTime;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    console.log(canvas.toDataURL("image/jpeg"));
  });
  //
};
