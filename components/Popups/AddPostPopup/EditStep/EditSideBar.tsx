import { useEffect, useRef, useState } from "react";
import { FiltersType, ImgVidFileType } from "..";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { getFiveFrames, getFramesFromVid } from "../utils";
import { AdjustmentsSection } from "./ImageSideBar/AdjustmentsSection";
import { EditImage, filtersRefT } from "./ImageSideBar/EditImage";
import { Tabs } from "./ImageSideBar/EditImageTabs";
import { EditVideo } from "./VideoSideBar/EditVideo";
import { FilterSection, filtersNames } from "./ImageSideBar/FilterSection";
import { CanvasCtxType } from ".";

type EditSideBarType = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
  vidCurrTime: number;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  contextCanvasRef: React.MutableRefObject<CanvasCtxType>;
};

export type AdjustNameType =
  | "brightness"
  | "contrast"
  | "saturation"
  | "temperature"
  | "fade"
  | "vignette";

const EditSidebar = ({
  files,
  setFiles,
  selectedFile,
  vidCurrTime,
  isPaused,
  setIsPaused,
  contextCanvasRef,
}: EditSideBarType) => {
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
          contextCanvasRef={contextCanvasRef}
        />
      ) : (
        <EditVideo
          files={files}
          setFiles={setFiles}
          selectedFile={selectedFile}
          videoFrames={videoFrames}
          vidCurrTime={vidCurrTime}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
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
