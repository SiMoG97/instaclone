import { CSSProperties, forwardRef } from "react";
import styles from "./style.module.scss";

type SwitchProps = {
  id: string;
  labelText?: string;
  style?: CSSProperties;
};

export const Checkbox = forwardRef<HTMLInputElement, SwitchProps>(
  function Checkbox({ id, labelText, style = {}, ...rest }, ref) {
    return (
      <div className={styles.squareCheckbox} style={style}>
        <input
          //   className={styles.squareCheckbox}
          id={id}
          type="checkbox"
          ref={ref}
          {...rest}
        />
        <label htmlFor={id}>
          {/* <div className={styles.circle}></div> */}
          <div className={styles.square}></div>
          <div className={styles.labeltext}>{labelText}</div>
        </label>
      </div>
    );
  }
);

export default Checkbox;
