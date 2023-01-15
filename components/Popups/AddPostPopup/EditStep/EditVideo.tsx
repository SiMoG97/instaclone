import { ImgVidFileType } from "..";
import styles from "../../popup.module.scss";
import { ChooseThumbNail } from "./ChooseThumbNail";
import { videosFramesT } from "./EditSideBar";
import Trim from "./Trim";

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
      <Trim Vidframes={findVideoFrames()} />
    </div>
  );
}

// export function useFindVideoFrames({}:{videoFrames:videosFramesT[],files:}) {
//   let vidFrames = videoFrames.find(
//     (vidFrame) => vidFrame.id === files[selectedFile].id
//   );
//   if (!vidFrames) {
//     vidFrames = { id: "", frames: [""] };
//   }
//   return vidFrames;
// }
