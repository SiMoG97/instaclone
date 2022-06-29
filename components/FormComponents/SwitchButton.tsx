import React from "react";
import styles from "./style.module.scss";

type switchProps = {
  isChecked: boolean;
  clickHandler: () => void;
};
const SwitchButton = ({ isChecked = false, clickHandler }: switchProps) => {
  return (
    <div>
      <input
        className={styles.checkboxInput}
        id="switch"
        type="checkbox"
        checked={isChecked}
        onClick={clickHandler}
        onChange={() => {}}
      />
      <label htmlFor="switch" className={styles.switchLabel}>
        <div></div>
        <div></div>
        <div className={styles.circle}></div>
      </label>
    </div>
  );
};

export default SwitchButton;
