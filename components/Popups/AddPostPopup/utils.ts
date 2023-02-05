export function widthAndHeightCalc(
  { parentW: pW, parentH: pH }: { parentW: number; parentH: number },
  imgAR: number
): { w: number; h: number } {
  const parentAR = pW / pH;
  if (parentAR === 1) {
    if (imgAR === 1) {
      return { w: pW, h: pH };
    } else if (imgAR > 1) {
      return { w: pW * imgAR, h: pH };
    }
    return { w: pW, h: pW / imgAR };
  } else if (parentAR > 1) {
    if (imgAR === 1) {
      return { w: pW, h: pW };
    } else if (imgAR > 1) {
      let [w, h] = [pW, pW / imgAR];
      if (h < pH) {
        h = pH;
        w = h * imgAR;
      }
      return { w, h };
    }
    return { w: pW, h: pW / imgAR };
  }
  if (imgAR === 1) {
    return { w: pH, h: pH };
  } else if (imgAR > 1) {
    return { w: pH * imgAR, h: pH };
  }
  let [w, h] = [pW, pW / imgAR];
  if (h < pH) {
    h = pH;
    w = h * imgAR;
  }
  return { w, h };
}

export function getFramesFromVid({
  frameTime,
  vidUrl,
}: {
  frameTime: number;
  vidUrl: string;
}): Promise<string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    video.src = vidUrl;
    video.addEventListener("loadeddata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = frameTime;
    });
    video.addEventListener("seeked", () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const src = canvas.toDataURL();
      dataUrlToBlob(src).then((blob) => {
        resolve(blob);
      });
    });
  });
}

export function dataUrlToBlob(dataUrl: string) {
  return fetch(dataUrl)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
}

export async function getFiveFrames(
  vidUrl: string,
  duration: number
): Promise<string[]> {
  return new Promise(async (resolve) => {
    const frames: string[] = [];
    for (let i = 0; i < 5; i++) {
      const frameTime = i * (duration / 5);
      const src = await getFramesFromVid({ vidUrl, frameTime });
      frames.push(src);
      if (i === 4) {
        resolve(frames);
      }
    }
  });
}
