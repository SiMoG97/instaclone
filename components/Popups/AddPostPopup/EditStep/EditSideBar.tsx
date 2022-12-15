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
  return (
    <div className={styles.bottomRangeContainer}>
      <RangeSlide startFrom="left" setedValue={100} changeHandler={() => {}} />
      <div className={styles.numberValue}>100</div>
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
