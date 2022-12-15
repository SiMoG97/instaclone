//

import { useState } from "react";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";

//
export const AdjustmentsSection = () => {
  return (
    <div className={styles.AdjustmentsSection}>
      {Adjustments.map(({ header, startedFrom }) => (
        <RangeUnit key={header} header={header} startedFrom={startedFrom} />
      ))}
    </div>
  );
};

type RangeUnitProps = {
  header: string;
  startedFrom: "left" | "mid";
};
const RangeUnit = ({ header, startedFrom }: RangeUnitProps) => {
  const [value, setValue] = useState(0);
  const changeValue = (newValue: number) => {
    setValue(() => newValue);
  };
  const resetValue = () => {
    setValue(() => 0);
  };
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

const Adjustments: RangeUnitProps[] = [
  { header: "Brightness", startedFrom: "mid" },
  { header: "Contrast", startedFrom: "mid" },
  { header: "Saturation", startedFrom: "mid" },
  { header: "Temperature", startedFrom: "mid" },
  { header: "Fade", startedFrom: "mid" },
  { header: "Vignette", startedFrom: "left" },
];
