import { useEffect, useRef, useState } from "react";
import { ARStateType, filtersRefT, ImgVidFileType, originalArCalcul } from "..";
import styles from "../../popup.module.scss";
import ArrowsAndDots from "../ArrowsAndDots";
import { widthAndHeightCalc } from "../utils";
import { ImagePreview } from "./ImagePreview";
import { CanvasWidthHeight } from "./utils";
import { VideoPreview } from "./VideoPreview";
import SidebarContainer from "../SidebarContainer";
import EditSidebar from "./EditSideBar";

export type CanvasCtxType = {
  ctx: CanvasRenderingContext2D | null;
};
type EditProps = {
  prevStep: number;
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  nextFile: () => void;
  prevFile: () => void;
  aspectRatio: ARStateType;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  filtersRef: React.MutableRefObject<filtersRefT | undefined>;
  step: number;
};
export type AdjustT = {
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
  fade: number;
  vignette: number;
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
  step,
  filtersRef,
}: EditProps) {
  // const filtersRef = useRef<filtersRefT | undefined>();
  const canvasDimRef = useRef({
    ...CanvasWidthHeight(aspectRatio, files[0].img),
  });
  const [adjustValues, setAdjustValues] = useState<AdjustT>({} as AdjustT);
  const [currFilterVal, setCurrFilterVal] = useState(100);
  const [tab, setTab] = useState<"Filters" | "Adjustments">("Filters");
  // const [someAdjustValue, setSomeAdjustValue] = useState(0);
  useEffect(() => {
    if (files[selectedFile].type !== "image") return;
    const { adjustSettings } = files[selectedFile];
    setAdjustValues(() => adjustSettings);
  }, [selectedFile]);

  const [isPaused, setIsPaused] = useState(true);
  const [vidCurrTime, setVidCurrTime] = useState(0);
  // useEffect(() => {
  //   return () => {
  //     console.log(step);
  //   };
  // }, [step]);
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
              adjustValues={adjustValues}
              currFilterVal={currFilterVal}
              tab={tab}
            />
          )}
        </div>
        <ArrowsAndDots
          filesLength={files.length}
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
          adjustValues={adjustValues}
          setAdjustValues={setAdjustValues}
          currFilterVal={currFilterVal}
          setCurrFilterVal={setCurrFilterVal}
          tab={tab}
          setTab={setTab}
          filtersRef={filtersRef}
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
