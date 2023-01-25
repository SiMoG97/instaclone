import { ImgVidFileType } from "..";
import { getFramesFromVid } from "../utils";
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
    // img.width = 500
    img.width = video.videoWidth;
    img.height = video.videoHeight;
    // console.log(video.videoWidth, video.videoHeight);
    // console.log(img.naturalWidth, img.naturalHeight);

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
    // video.addEventListener("loadedmetadata", () => {
    //   console.log(video.videoWidth);
    // });
  });
}
