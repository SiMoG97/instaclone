import { useEffect, useState } from "react";
import RangeSlide from "../../../../FormComponents/RangeSlide";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { Tabs } from "./EditImageTabs";
import { FilterSection } from "./FilterSection";
import styles from "../../../popup.module.scss";
import { filtersRefT, FiltersType, ImgVidFileType } from "../..";
import { AdjustT } from "..";

export type AdjustNameType =
  | "brightness"
  | "contrast"
  | "saturation"
  | "temperature"
  | "fade"
  | "vignette";

type EditImageType = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
  filtersRef: React.MutableRefObject<filtersRefT | undefined>;
  adjustValues: AdjustT;
  setAdjustValues: React.Dispatch<React.SetStateAction<AdjustT>>;
  currFilterVal: number;
  setCurrFilterVal: React.Dispatch<React.SetStateAction<number>>;
  tab: "Filters" | "Adjustments";
  setTab: React.Dispatch<React.SetStateAction<"Filters" | "Adjustments">>;
};

export function EditImage({
  files,
  setFiles,
  selectedFile,
  filtersRef,
  adjustValues,
  setAdjustValues,
  currFilterVal,
  setCurrFilterVal,
  tab,
  setTab,
}: EditImageType) {
  // const [tab, setTab] = useState<"Filters" | "Adjustments">("Filters");
  // const [currFilterVal, setCurrFilterVal] = useState(100);

  useImgChangeFilterChange(files, filtersRef, selectedFile, setCurrFilterVal);

  function setFilterToSelectedImg(filterName: FiltersType) {
    const newFiles = files.map((file, i) => {
      if (i !== selectedFile) return file;
      return { ...file, filter: filterName };
    });
    setFiles(() => newFiles);
  }

  function setAdjsutSettingsToSelectedImg(
    adjustName: AdjustNameType,
    newValue: number
  ) {
    const adjustSettings = files[selectedFile].adjustSettings;
    adjustSettings[adjustName] = newValue;
    const newFiles = files.map((file, i) => {
      if (i !== selectedFile) return file;
      return { ...file, adjustSettings };
    });
    setFiles(() => newFiles);
  }

  function updateAdjustValues(adjustName: AdjustNameType, newValue: number) {
    const newAdjustValues = { ...adjustValues };
    newAdjustValues[adjustName] = newValue;
    setAdjustValues(() => newAdjustValues);
  }

  function handleRangeChange(newValue: number) {
    if (!filtersRef.current) return;
    const newFiltersValue = filtersRef.current.map((item) => {
      if (item.postId !== files[selectedFile].id) return item;
      const newFilters = item.filters.map((filter) => {
        if (filter.name !== files[selectedFile].filter) return filter;
        filter.value = newValue;
        return filter;
      });
      item.filters = newFilters;
      return item;
    });
    setCurrFilterVal(newValue);
    filtersRef.current = newFiltersValue;
  }
  return (
    <>
      <Tabs tab={tab} setTab={setTab} />
      {tab === "Filters" ? (
        <>
          <FilterSection
            currFilter={files[selectedFile].filter}
            setFilter={setFilterToSelectedImg}
          />
          {files[selectedFile].filter !== "Original" ? (
            <BottomRange
              handleChange={handleRangeChange}
              currFilterValue={currFilterVal}
            />
          ) : null}
        </>
      ) : (
        <AdjustmentsSection
          adjustmentSettings={files[selectedFile].adjustSettings}
          setAdjust={setAdjsutSettingsToSelectedImg}
          updateAdjustValues={updateAdjustValues}
          adjustValues={adjustValues}
          setAdjustValues={setAdjustValues}
        />
      )}
    </>
  );
}

type BottomRangeType = {
  currFilterValue: number;
  handleChange: (newValue: number) => void;
};

const BottomRange = ({ currFilterValue, handleChange }: BottomRangeType) => {
  const [filterValue, setFilterValue] = useState(currFilterValue);
  const changeValue = (newValue: number) => {
    handleChange(newValue);
  };
  useEffect(() => {
    setFilterValue(() => currFilterValue);
  }, [currFilterValue]);

  return (
    <div className={styles.bottomRangeContainer}>
      <RangeSlide
        startFrom="left"
        setedValue={currFilterValue}
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

function useImgChangeFilterChange(
  files: ImgVidFileType[],
  filtersRef: React.MutableRefObject<filtersRefT | undefined>,
  selectedFile: number,
  setCurrFilterVal: React.Dispatch<React.SetStateAction<number>>
): void {
  useEffect(() => {
    if (!filtersRef.current) return;
    let filterVal = 50;
    filtersRef.current[selectedFile].filters.forEach(({ name, value }) => {
      if (name !== files[selectedFile].filter) return;
      filterVal = value;
    });
    setCurrFilterVal(() => filterVal);
  }, [selectedFile, files[selectedFile].filter]);
}
