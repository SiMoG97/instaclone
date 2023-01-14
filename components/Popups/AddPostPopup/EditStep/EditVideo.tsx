import { ImgVidFileType } from "..";
import styles from "../../popup.module.scss";
import { ChooseThumbNail } from "./ChooseThumbNail";
import { videosFramesT } from "./EditSideBar";

type EditVideoType = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
  videoFrames: videosFramesT[];
};
export function EditVideo({
  files,
  selectedFile,
  setFiles,
  videoFrames,
}: EditVideoType) {
  function findVideoFrames() {
    let vidFrames = videoFrames.find(
      (vidFrame) => vidFrame.id === files[selectedFile].id
    );
    if (!vidFrames) {
      vidFrames = { id: "", frames: [""] };
    }
    return vidFrames;
  }
  return (
    <div className={styles.editVideoContainer}>
      <ChooseThumbNail
        file={files[selectedFile]}
        Vidframes={findVideoFrames()}
      />
    </div>
  );
}
