import styles from "../../popup.module.scss";
import Image from "next/image";

export const FilterSection = () => {
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
    </div>
  );
};
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
