import styles from "../popup.module.scss";
import Image from "next/image";

const filtersNames = [
  "Original",
  "Clarendon",
  "Gingham",
  "Moon",
  "Lark",
  "Reyes",
  "Juno",
  "Slumber",
  "Crema",
  "Ludwig",
  "Aden",
  "Perpetua",
];

type SidebarContainerProps = {
  step: number;
};

const SidebarContainer = ({ step }: SidebarContainerProps) => {
  return (
    <div
      className={`${styles.sidebarContainer} ${
        step > 1 ? styles.sidebarFullWidth : ""
      }`}
    >
      <EditFilters />
    </div>
  );
};

const EditFilters = () => {
  return (
    <div className={`${styles.filters} ${styles.inContainer}`}>
      {filtersNames.map((name, i) => {
        return (
          <div
            key={name}
            className={`${styles.filterContainer} ${
              i === 0 ? styles.selected : ""
            }`}
          >
            <div className={styles.filterConainerImg}>
              <Image
                src={`/editFiltersImgs/${name}.jpg`}
                width={88}
                height={88}
              />
            </div>
            <div className={styles.filterName}>{name}</div>
          </div>
        );
      })}
      {/* <Image src={} /> */}
    </div>
  );
};

export default SidebarContainer;
