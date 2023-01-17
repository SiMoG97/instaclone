import styles from "../../../popup.module.scss";

type TabsProps = {
  tab: "Filters" | "Adjustments";
  setTab: React.Dispatch<React.SetStateAction<"Filters" | "Adjustments">>;
};

export const Tabs = ({ setTab, tab }: TabsProps) => {
  return (
    <div className={styles.tabs}>
      <div
        onClick={() => setTab("Filters")}
        className={tab === "Filters" ? styles.selectedTab : ""}
      >
        Filters
      </div>
      <div
        onClick={() => setTab("Adjustments")}
        className={tab === "Adjustments" ? styles.selectedTab : ""}
      >
        Adjustments
      </div>
    </div>
  );
};
