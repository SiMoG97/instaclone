import React from "react";
import styles from "./style.module.scss";

const Checkbox = () => {
  return (
    <div>
      <input className={styles.checkboxInput} id="switch" type="checkbox" />
      <div className={styles.something}></div>
      <label htmlFor="switch" className={styles.switchLabel}>
        <div></div>
        <div></div>
        <div className={styles.circle}></div>
      </label>
    </div>
  );
};

export default Checkbox;
