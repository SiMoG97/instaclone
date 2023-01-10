import styles from "../../popup.module.scss";
import Image from "next/image";
import { FiltersType } from "..";
// import { filter, filtersRefT } from "./EditImage";

type FilterSectionType = {
  setFilter: (filterName: FiltersType) => void;
  currFilter: FiltersType;
  // filtersVal: {
  //   postId: string;
  //   filters: filter[];
  // };
};

export const FilterSection = ({
  setFilter,
  currFilter,
}: // filtersVal,
FilterSectionType) => {
  return (
    <div className={styles.filtersSction}>
      <div className={`${styles.filters} ${styles.inContainer}`}>
        {filtersNames.map((name, i) => {
          return (
            <div
              onClick={() => {
                setFilter(name);
              }}
              key={name}
              className={`${styles.filterContainer} ${
                name === currFilter ? styles.selected : ""
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
    </div>
  );
};

export const filtersNames: FiltersType[] = [
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
