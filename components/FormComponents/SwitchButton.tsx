import { forwardRef } from "react";
import styles from "./style.module.scss";

type SwitchProps = {
  id: string;
  variation?: "normal" | "large";
};

export const SwitchButton = forwardRef<HTMLInputElement, SwitchProps>(
  function SwitchButton({ id, variation, ...rest }, ref) {
    return (
      <div>
        <input
          className={styles.checkboxInput}
          id={id}
          type="checkbox"
          ref={ref}
          {...rest}
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
  }
);

export default SwitchButton;
