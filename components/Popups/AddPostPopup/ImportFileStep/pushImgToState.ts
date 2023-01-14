import { ImgVidFileType } from "..";
import { newFileConstructor } from "./newFileConstructor";

type pushImgToStateType = {
  file: File;
  selectedFileIdRef?: React.MutableRefObject<string>;
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  i?: number;
};

export function pushImgToState(
  { file, selectedFileIdRef = undefined, i = 1, setFiles }: pushImgToStateType,
  callBack?: () => void
) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const img = new Image();
    img.src = `${reader.result}`;
    const newFile = newFileConstructor({ type: "image", img });
    if (selectedFileIdRef && i === 0) {
      selectedFileIdRef.current = newFile.id;
    }
    setFiles((currFiles) => [...currFiles, newFile]);
    if (callBack) {
      callBack();
    }
  });
  reader.readAsDataURL(file);
}

function dataURLToBlob(dataURL: string) {
  var parts = dataURL.split(",");
  var contentType = parts[0].split(":")[1];
  var raw = parts[1];

  return new Blob([raw], { type: contentType });
}
