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
  getFramesFromVid({ vidUrl, frameTime: 2 });
  video.src = vidUrl;
  video.addEventListener("loadeddata", function () {
    const newFile = newFileConstructor({
      type: "video",
      vidUrl,
      endsAt: video.duration,
    });
    setFiles((currFiles) => [...currFiles, newFile]);
    if (callBack) {
      callBack();
    }
  });
}
