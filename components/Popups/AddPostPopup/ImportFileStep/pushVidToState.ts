import { ImgVidFileType } from "..";
import { newFileConstructor } from "./newFileConstructor";

export const pushVidToState = (
  file: File,
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>
) => {
  const video = document.createElement("video");
  const vidUrl = URL.createObjectURL(file);
  video.src = vidUrl;
  video.addEventListener("loadeddata", function () {
    const newFile = newFileConstructor({
      type: "video",
      vidUrl,
      endsAt: video.duration,
    });
    setFiles((currFiles) => [...currFiles, newFile]);
  });
};
