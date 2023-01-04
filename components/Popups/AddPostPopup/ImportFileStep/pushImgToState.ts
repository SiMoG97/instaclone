import { ImgVidFileType } from "..";
import { newFileConstructor } from "./newFileConstructor";

type pushImgToStateType = {
  file: File;
  selectedFileIdRef?: React.MutableRefObject<string>;
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  i?: number;
};

export const pushImgToState = ({
  file,
  selectedFileIdRef = undefined,
  i = 1,
  setFiles,
}: pushImgToStateType) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const img = new Image();
    img.src = `${reader.result}`;
    const newFile = newFileConstructor({ type: "image", img });
    if (selectedFileIdRef && i === 0) {
      selectedFileIdRef.current = newFile.id;
    }
    setFiles((currFiles) => [...currFiles, newFile]);
  });
  reader.readAsDataURL(file);
};
