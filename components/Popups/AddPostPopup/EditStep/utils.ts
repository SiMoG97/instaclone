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
}: GetFramesFromVidType): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    video.src = vidUrl;
    video.addEventListener("loadeddata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = frameTime;
    });
    video.addEventListener("seeked", async () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const src = canvas.toDataURL();
      resolve(src);
    });
  });
};

export function getFiveFrame(
  vidUrl: string,
  duration: number,
  frames: string[]
) {
  for (let i = 0; i < 5; i++) {
    const frameTime = i * (duration / 5);
    getFramesFromVid({ vidUrl, frameTime }).then((src) => {
      frames.push(src);
      console.log(frames);
    });
  }
}
