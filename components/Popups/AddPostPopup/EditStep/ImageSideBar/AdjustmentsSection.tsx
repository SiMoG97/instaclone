//

import { useEffect, useState } from "react";
import { AdjustT } from "..";
import RangeSlide from "../../../../FormComponents/RangeSlide";
import styles from "../../../popup.module.scss";
import { AdjustNameType } from "../EditSideBar";

//

type adjustmentSettingsType = {
  [key in AdjustNameType]: number;
};
type AdjustmentsSectionType = {
  adjustmentSettings: adjustmentSettingsType;
  setAdjust: (adjustName: AdjustNameType, newValue: number) => void;
  updateAdjustValues(adjustName: AdjustNameType, newValue: number): void;
  adjustValues: AdjustT;
  setAdjustValues: React.Dispatch<React.SetStateAction<AdjustT>>;
};
export const AdjustmentsSection = ({
  setAdjust,
  adjustmentSettings,
  updateAdjustValues,
  setAdjustValues,
}: AdjustmentsSectionType) => {
  // console.log(adjustmentSettings);
  // console.log(adjustmentSettings);
  return (
    <div className={styles.AdjustmentsSection}>
      {Adjustments.map(({ header, startedFrom }) => (
        <RangeUnit
          setAdjust={setAdjust}
          key={header}
          header={header}
          startedFrom={startedFrom}
          currentValue={adjustmentSettings[header]}
          updateAdjustValues={updateAdjustValues}
          setAdjustValues={setAdjustValues}
        />
      ))}
    </div>
  );
};

type RangeUnitProps = {
  header: AdjustNameType;
  startedFrom: "left" | "mid";
  setAdjust: (adjustName: AdjustNameType, newValue: number) => void;
  updateAdjustValues(adjustName: AdjustNameType, newValue: number): void;
  currentValue: number;
  setAdjustValues: React.Dispatch<React.SetStateAction<AdjustT>>;
};
const RangeUnit = ({
  header,
  startedFrom,
  setAdjust,
  updateAdjustValues,
  currentValue,
  setAdjustValues,
}: RangeUnitProps) => {
  const [value, setValue] = useState(currentValue);
  const changeValue = (newValue: number) => {
    updateAdjustValues(header, newValue);
    setValue(() => newValue);
  };
  const resetValue = () => {
    setValue(() => 0);
    setAdjust(header, 0);
    updateAdjustValues(header, 0);
  };
  useEffect(() => {
    setValue(() => currentValue);
  }, [currentValue]);

  return (
    <div className={styles.RangeUnit}>
      <div className={styles.RangeUnitTop}>
        <div className={styles.RangeHeader}>{header}</div>
        {value !== 0 ? (
          <div onClick={resetValue} className={styles.RangeReset}>
            Reset
          </div>
        ) : null}
      </div>
      <div className={styles.RangeValueContainer}>
        <RangeSlide
          changeHandler={changeValue}
          startFrom={startedFrom}
          setedValue={value}
          pointerUp={() => {
            setAdjust(header, value);
          }}
        />
        <div
          className={`${styles.numberValue} ${
            value !== 0 ? styles.changed : ""
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

const Adjustments: { header: AdjustNameType; startedFrom: "left" | "mid" }[] = [
  { header: "brightness", startedFrom: "mid" },
  { header: "contrast", startedFrom: "mid" },
  { header: "saturation", startedFrom: "mid" },
  { header: "temperature", startedFrom: "mid" },
  { header: "fade", startedFrom: "left" },
  { header: "vignette", startedFrom: "left" },
];
