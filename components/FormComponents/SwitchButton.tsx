// import React from "react";
import styles from "./style.module.scss";

type switchProps = {
  id: string;
  isChecked: boolean;
  clickHandler: () => void;
  className?: string;
};
const SwitchButton = ({
  id,
  isChecked = false,
  clickHandler,
  className = "",
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
      <label htmlFor={id} className={`${styles.switchLabel} ${className}`}>
        <div></div>
        <div></div>
        <div className={styles.circle}></div>
      </label>
    </div>
  );
};

export default SwitchButton;
