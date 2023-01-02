import { useEffect, useRef, useState } from "react";
import { FiltersType, ImgFileType } from "..";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { Tabs } from "./EditTabs";
import { FilterSection, filtersNames } from "./FilterSection";

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

export type filter = {
  name: string;
  value: number;
};

export type filtersRefT = { postId: string; filters: filter[] }[];

const EditSidebar = ({ files, setFiles, selectedFile }: EditSideBarType) => {
  const [tab, setTab] = useState<"Filters" | "Adjustments">("Filters");
  const [currFilterVal, setCurrFilterVal] = useState(100);
  // init all images filters values
  const filtersRef = useRef<filtersRefT | undefined>();
  useInitFilterVal(filtersRef, files);

  // if curr image changes then change current filters
  useEffect(() => {
    if (!filtersRef.current) return;
    let filterVal = 100;
    filtersRef.current[selectedFile].filters.forEach(({ name, value }) => {
      if (name !== files[selectedFile].filter) return;
      filterVal = value;
    });
    setCurrFilterVal(() => filterVal);
  }, [selectedFile, files[selectedFile].filter]);

  const setFilterToSelectedImg = (filterName: FiltersType) => {
    const newFiles = files.map((file, i) => {
      if (i !== selectedFile) return file;
      return { ...file, filter: filterName };
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
      if (i === selectedFile) return file;
      return { ...file, adjustSettings };
    });
    setFiles(() => newFiles);
  };

  const handleRangeChange = (newValue: number) => {
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
        />
      )}
    </div>
  );
};
export default EditSidebar;

type BottomRangeType = {
  currFilterValue: number;
  handleChange: (newValue: number) => void;
};

const BottomRange = ({ currFilterValue, handleChange }: BottomRangeType) => {
  const [filterValue, setFilterValue] = useState(currFilterValue);
  const changeValue = (newValue: number) => {
    setFilterValue(() => newValue);
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
        pointerUp={() => {
          handleChange(filterValue);
        }}
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
const useInitFilterVal = (
  filtersRef: React.MutableRefObject<filtersRefT | undefined>,
  files: ImgFileType[]
) => {
  useEffect(() => {
    filtersRef.current = files.map((file) => ({
      postId: file.id,
      filters: filtersNames.map((name) => ({
        name,
        value: 100,
      })),
    }));
  }, []);
};
