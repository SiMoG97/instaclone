import { CSSProperties, forwardRef, InputHTMLAttributes } from "react";
import styles from "./style.module.scss";

type InputType = {
  id?: string;
  size?: "normal" | "large";
  border?: boolean;
  disabled?: boolean;
  color?: "light" | "dark";
  style?: CSSProperties;
  placeholder?: string;
  placeholderSize?: "placeHLG" | "placeHSM";
  readonly?: boolean;
  onClickCB?: (...args: any[]) => any;
};

const InputForm = forwardRef<HTMLInputElement, InputType>(
  (
    {
      border = true,
      color = "light",
      disabled = false,
      size = "normal",
      placeholderSize = "placeHLG",
      readonly = false,
      onClickCB = () => {},
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${border === true ? styles.border : ""} 
        ${styles[color]} ${styles[size]} ${styles[placeholderSize]}`}
        disabled={disabled}
        {...rest}
        readOnly={readonly}
        onClick={onClickCB}
      />
    );
  }
);
InputForm.displayName = "InputForm";
export default InputForm;
