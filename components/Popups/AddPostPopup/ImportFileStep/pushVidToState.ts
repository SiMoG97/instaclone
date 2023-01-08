import { ImgVidFileType } from "..";
import { getFramesFromVid } from "../EditStep/utils";
import { newFileConstructor } from "./newFileConstructor";

type pushVidStateType = {
  file: File;
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFileIdRef?: React.MutableRefObject<string>;
  i?: number;
};

export function pushVidToState(
  { file, setFiles, selectedFileIdRef, i }: pushVidStateType,
  callBack?: () => void
) {
  const video = document.createElement("video");
  const vidUrl = URL.createObjectURL(file);
  video.src = vidUrl;
  video.addEventListener("loadeddata", async function () {
    const img = new Image();
    const src = await getFramesFromVid({ vidUrl, frameTime: 0 });
    img.src = src;
    const newFile = newFileConstructor({
      type: "video",
      img,
      vidUrl,
      endsAt: video.duration,
    });
    if (selectedFileIdRef && i === 0) {
      selectedFileIdRef.current = newFile.id;
    }
    setFiles((currFiles) => [...currFiles, newFile]);
    if (callBack) {
      callBack();
    }
  });
}
