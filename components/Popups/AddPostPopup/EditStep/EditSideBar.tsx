import { useEffect, useRef, useState } from "react";
import { FiltersType, ImgVidFileType } from "..";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { EditImage, filtersRefT } from "./EditImage";
import { Tabs } from "./EditTabs";
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
        <EditVideo />
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
