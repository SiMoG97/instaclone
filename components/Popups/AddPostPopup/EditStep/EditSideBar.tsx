import { useEffect, useRef, useState } from "react";
import { FiltersType, ImgVidFileType } from "..";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { getFiveFrames, getFramesFromVid } from "../utils";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { EditImage, filtersRefT } from "./EditImage";
import { Tabs } from "./EditImageTabs";
import { EditVideo } from "./EditVideo";
import { FilterSection, filtersNames } from "./FilterSection";

type EditSideBarType = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
};

export type AdjustNameType =
  | "brightness"
  | "contrast"
  | "saturation"
  | "temperature"
  | "fade"
  | "vignette";

const EditSidebar = ({ files, setFiles, selectedFile }: EditSideBarType) => {
  const filtersRef = useRef<filtersRefT | undefined>();
  useInitFilterVal(filtersRef, files);
  const videoFrames = useGetFramesForVideos({ files });

  return (
    <div className={styles.editSideBarContainer}>
      {files[selectedFile].type === "image" ? (
        <EditImage
          files={files}
          setFiles={setFiles}
          selectedFile={selectedFile}
          filtersRef={filtersRef}
        />
      ) : (
        <EditVideo
          files={files}
          setFiles={setFiles}
          selectedFile={selectedFile}
          videoFrames={videoFrames}
        />
      )}
    </div>
  );
};
export default EditSidebar;

function useInitFilterVal(
  filtersRef: React.MutableRefObject<filtersRefT | undefined>,
  files: ImgVidFileType[]
) {
  useEffect(() => {
    filtersRef.current = files.map((file) => ({
      postId: file.id,
      filters: filtersNames.map((name) => ({
        name,
        value: 100,
      })),
    }));
  }, []);
}

export type videosFramesT = { id: string; frames: string[] };

function useGetFramesForVideos({ files }: { files: ImgVidFileType[] }) {
  const [videosFrames, setVideosFrames] = useState<videosFramesT[]>([]);
  useEffect(() => {
    files
      .filter((file) => file.type === "video")
      .forEach(async (file) => {
        const { id, vidUrl, duration } = file;
        const frames = await getFiveFrames(vidUrl, duration);
        const videoFrames = { id, frames };
        setVideosFrames((currFrames) => [...currFrames, videoFrames]);
      });
  }, []);
  return videosFrames;
}
