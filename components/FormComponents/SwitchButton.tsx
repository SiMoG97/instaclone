// import React from "react";
import styles from "./style.module.scss";

type switchProps = {
  id: string;
  isChecked: boolean;
  clickHandler: () => void;
  variation?: "normal" | "large";
};
const SwitchButton = ({
  id,
  isChecked = false,
  clickHandler,
  variation = "normal",
}: switchProps) => {
  return (
    <div>
      <input
        className={styles.checkboxInput}
        id={id}
        type="checkbox"
        checked={isChecked}
        onClick={clickHandler}
        onChange={() => {}}
      />
      <label
        htmlFor={id}
        className={`${styles.switchLabel} ${
          variation === "large" ? styles.large : styles.normal
        }`}
      >
        <div className={styles.circle}></div>
      </label>
    </div>
  );
};

export default SwitchButton;
