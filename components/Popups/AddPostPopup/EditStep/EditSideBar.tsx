import { useState } from "react";
import { FiltersType, ImgFileType } from "..";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { Tabs } from "./EditTabs";
import { FilterSection } from "./FilterSection";

type EditSideBarType = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
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
  const [tab, setTab] = useState<"Filters" | "Adjustments">("Filters");

  const setFilterToSelectedImg = (filterName: FiltersType) => {
    const newFiles = files.map((file, i) => {
      if (i === selectedFile) {
        return { ...file, filter: filterName };
      }
      return file;
    });
    setFiles(() => newFiles);
  };

  const setAdjsutSettingsToSelectedImg = (
    adjustName: AdjustNameType,
    newValue: number
  ) => {
    const adjustSettings = files[selectedFile].adjustSettings;
    adjustSettings[adjustName] = newValue;
    const newFiles = files.map((file, i) => {
      if (i === selectedFile) {
        return { ...file, adjustSettings };
      }
      return file;
    });
    setFiles(() => newFiles);
  };

  return (
    <div className={styles.editSideBarContainer}>
      <Tabs tab={tab} setTab={setTab} />
      {tab === "Filters" ? (
        <>
          <FilterSection
            currFilter={files[selectedFile].filter}
            setFilter={setFilterToSelectedImg}
          />
          {files[selectedFile].filter !== "Original" ? <BottomRange /> : null}
        </>
      ) : (
        <>
          <AdjustmentsSection
            adjustmentSettings={files[selectedFile].adjustSettings}
            setAdjust={setAdjsutSettingsToSelectedImg}
          />
        </>
      )}
    </div>
  );
};
export default EditSidebar;

const BottomRange = () => {
  const [filterValue, setFilterValue] = useState(100);
  const changeValue = (newValue: number) => {
    setFilterValue(() => newValue);
  };
  return (
    <div className={styles.bottomRangeContainer}>
      <RangeSlide
        startFrom="left"
        setedValue={filterValue}
        changeHandler={changeValue}
      />
      <div
        className={`${styles.numberValue} ${
          filterValue !== 0 ? styles.changed : ""
        }`}
      >
        {filterValue}
      </div>
    </div>
  );
};

// type RangeNumberProps = {
//   startFrom: "left" | "mid";
// };
// const RangeNumber = ({ startFrom }: RangeNumberProps) => {
//   return (
//     <div className={styles.bottomRangeContainer}>
//       <RangeSlide
//         startFrom={startFrom}
//         setedValue={0}
//         changeHandler={() => {}}
//       />
//       <div>100</div>
//     </div>
//   );
// };
