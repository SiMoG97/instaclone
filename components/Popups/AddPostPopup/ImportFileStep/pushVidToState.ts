import { ImgVidFileType } from "..";
import { getFramesFromVid } from "../EditStep/utils";
import { newFileConstructor } from "./newFileConstructor";

export function pushVidToState(
  file: File,
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>,
  callBack?: () => void
) {
  const video = document.createElement("video");
  const vidUrl = URL.createObjectURL(file);
  ////
  // getFramesFromVid({ vidUrl, frameTime: 2 });
  // getImgP({ vidUrl, frameTime: 1 }).then((data) => {
  //   console.log(data);
  // });
  ////
  video.src = vidUrl;
  video.addEventListener("loadeddata", function () {
    getFramesFromVid({ vidUrl, frameTime: 0 }).then((src) => {
      const img = new Image();
      img.src = src;
      const newFile = newFileConstructor({
        type: "video",
        img,
        vidUrl,
        endsAt: video.duration,
      });
      setFiles((currFiles) => [...currFiles, newFile]);
      if (callBack) {
        callBack();
      }
    });
  });
}
