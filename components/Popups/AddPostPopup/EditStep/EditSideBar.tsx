import { useState } from "react";
import RangeSlide from "../../../FormComponents/RangeSlide";
import styles from "../../popup.module.scss";
import { AdjustmentsSection } from "./AdjustmentsSection";
import { Tabs } from "./EditTabs";
import { FilterSection } from "./FilterSection";

const EditSidebar = () => {
  const [tab, setTab] = useState<"Filters" | "Adjustments">("Filters");
  return (
    <div className={styles.editSideBarContainer}>
      <Tabs tab={tab} setTab={setTab} />
      {tab === "Filters" ? (
        <>
          <FilterSection />
          <BottomRange />
        </>
      ) : (
        <>
          <AdjustmentsSection />
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
