import { forwardRef } from "react";
import styles from "./style.module.scss";

type RadioProps = {
  id: string;
  value: number | string;
  size?: "lg" | "sm";
  bold?: boolean;
};

export const RAdioInput = forwardRef<HTMLInputElement, RadioProps>(
  function RadioInput({ id, value, bold, size = "lg", ...rest }, ref) {
    return (
      <div className={`${styles.radioConrainer}`}>
        <input type="radio" id={id} value={value} ref={ref} {...rest} />
        <label
          className={`${styles.radioLabel} ${bold ? styles.bold : ""} ${
            size === "sm" ? styles.smallCircle : ""
          }`}
          htmlFor={id}
        >
          <div
            className={`${styles.customRadio} ${
              size === "sm" ? styles.smallCircle : ""
            }`}
          ></div>
          <div>{value}</div>
        </label>
      </div>
    );
  }
);
