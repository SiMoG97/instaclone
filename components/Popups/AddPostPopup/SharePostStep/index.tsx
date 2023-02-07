import React, { useEffect, useRef, useState } from "react";
import SidebarContainer from "../SidebarContainer";
import styles from "../../popup.module.scss";
import { ARStateType, FilesToUploadT, VidToUp } from "..";
import ArrowsAndDots from "../ArrowsAndDots";
import { VideoPreview } from "../EditStep/VideoPreview";
import { ShowEditedVid } from "./ShowEditedVid";
import { ShareSideBar } from "./ShareSideBar";

type SharePostStepT = {
  step: number;
  selectedFile: number;
  nextFile(): void;
  prevFile(): void;
  aspectRatio: ARStateType;
  filesToUp: FilesToUploadT;
};

export function SharePostStep({
  step,
  selectedFile,
  aspectRatio,
  nextFile,
  prevFile,
  filesToUp,
}: SharePostStepT) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVidPaused, setIsVidPaused] = useState(true);
  const [vidCurrTime, setVidCurrTime] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (!isFirstRender.current && isLoading) {
      setIsLoading(() => false);
    }
  }, [filesToUp]);

  return (
    <>
      <div className={`${styles.shareStep} `}>
        <div className={styles.imgVidContainer}>
          {filesToUp[selectedFile]?.type === "image" ? (
            <ShowEditedImage
              src={filesToUp[selectedFile]?.src}
              isLoading={isLoading}
              aspectRatio={aspectRatio}
            />
          ) : (
            <ShowEditedVid
              aspectRatio={aspectRatio}
              vidToUp={filesToUp[selectedFile] as VidToUp}
            />
          )}
        </div>
        <ArrowsAndDots
          filesLength={filesToUp.length}
          nextFile={nextFile}
          prevFile={prevFile}
          selectedFile={selectedFile}
        />
      </div>

      <SidebarContainer step={3} prevStep={5}>
        {/* <div className={styles.shareSideBar}>
          <h1>step 3 </h1>
        </div> */}
        <ShareSideBar filesToUp={filesToUp} />
      </SidebarContainer>
    </>
  );
}

type showEditedimageT = {
  isLoading: boolean;
  src: string;
  aspectRatio: ARStateType;
};
function ShowEditedImage({ isLoading, src, aspectRatio }: showEditedimageT) {
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <img
      src={src}
      alt=""
      className={`${
        aspectRatio !== "original"
          ? `${styles[aspectRatio]} ${styles.responsive}`
          : ""
      }`}
    />
  );
}
