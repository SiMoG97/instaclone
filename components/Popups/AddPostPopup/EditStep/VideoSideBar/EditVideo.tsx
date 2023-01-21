import { ImgVidFileType } from "../..";
import styles from "../../../popup.module.scss";
import { ChooseThumbNail } from "./ChooseThumbNail";
import { videosFramesT } from "../EditSideBar";
import Trim from "./Trim";
import SoundOnOff from "./SoundOnOff";

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
  function updateCoverTime(id: string, coverTime: number) {
    const newFiles = files.map((file) => {
      if (file.id !== id) return file;
      file.coverTime = coverTime;
      return file;
    });
    setFiles(() => newFiles);
  }
  function updateVideoStartAndEnd(newFile: ImgVidFileType) {
    const newFiles = files.map((file) => {
      if (file.id !== newFile.id) return file;
      return newFile;
    });
    setFiles(() => newFiles);
  }

  function updateSoundOnOff(newFile: ImgVidFileType) {
    const newFiles = files.map((file) => {
      if (file.id !== newFile.id) return file;
      return newFile;
    });
    setFiles(() => newFiles);
  }
  return (
    <div className={styles.editVideoContainer}>
      <ChooseThumbNail
        file={files[selectedFile]}
        Vidframes={findVideoFrames()}
        updateCoverTime={updateCoverTime}
      />
      <Trim
        file={files[selectedFile]}
        Vidframes={findVideoFrames()}
        updateVideoStartAndEnd={updateVideoStartAndEnd}
      />
      <SoundOnOff
        file={files[selectedFile]}
        updateSoundOnOff={updateSoundOnOff}
      />
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
