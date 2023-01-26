import { useEffect, useRef, useState } from "react";
import { ARStateType, ImgVidFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";
import ArrowsAndDots from "../ArrowsAndDots";
import { widthAndHeightCalc } from "../utils";
import { applyMoonFilter } from "./ImageSideBar/filters";
import { ImagePreview } from "./ImagePreview";
import { CanvasWidthHeight } from "./utils";
import { VideoPreview } from "./VideoPreview";
import SidebarContainer from "../SidebarContainer";
import EditSidebar from "./EditSideBar";
type EditProps = {
  prevStep: number;
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  nextFile: () => void;
  prevFile: () => void;
  aspectRatio: ARStateType;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
};

export function EditStep({
  prevStep,
  files,
  setFiles,
  aspectRatio,
  nextFile,
  prevFile,
  selectedFile,
  setSelectedFile,
}: EditProps) {
  const canvasDimRef = useRef({
    ...CanvasWidthHeight(aspectRatio, files[0].img),
  });
  const [isPaused, setIsPaused] = useState(true);
  const [vidCurrTime, setVidCurrTime] = useState(0);
  return (
    <>
      <div className={styles.EditStep}>
        <div className={styles.canvasVidContainer}>
          {files[selectedFile].type === "video" ? (
            <VideoPreview
              file={files[selectedFile]}
              aspectRatio={aspectRatio}
              setVidCurrTime={setVidCurrTime}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
            />
          ) : (
            <ImagePreview
              file={files[selectedFile]}
              width={canvasDimRef.current.width}
              height={canvasDimRef.current.height}
              aspectRatio={aspectRatio}
            />
          )}
        </div>
        <ArrowsAndDots
          files={files}
          nextFile={nextFile}
          prevFile={prevFile}
          selectedFile={selectedFile}
        />
      </div>

      <SidebarContainer step={2} prevStep={prevStep}>
        <EditSidebar
          files={files}
          setFiles={setFiles}
          selectedFile={selectedFile}
          vidCurrTime={vidCurrTime}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </SidebarContainer>
    </>
  );
}

export function CalcOriginal(w: number, h: number) {
  const ar = w / h;
  if (ar === 1) {
    return {
      width: "100%",
      height: "100%",
      aspectRatio: `${ar}`,
    };
  } else if (ar > 1) {
    return {
      width: "100%",
      height: "auto",
      aspectRatio: `${ar}`,
    };
  }
  return {
    width: "auto",
    height: "100%",
    aspectRatio: `${ar}`,
  };
}
