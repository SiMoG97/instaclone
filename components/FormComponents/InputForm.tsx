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
};

const InputForm = forwardRef<HTMLInputElement, InputType>(
  (
    {
      border = true,
      color = "light",
      disabled = false,
      size = "normal",
      placeholderSize = "placeHLG",
      children,
      ...rest
    },
    ref
  ) => {
    console.log(rest);
    return (
      <input
        ref={ref}
        className={`${styles.input} ${border === true ? styles.border : ""} 
        ${styles[color]} ${styles[size]} ${styles[placeholderSize]}`}
        disabled={disabled}
        {...rest}
      />
    );
  }
);
InputForm.displayName = "InputForm";
export default InputForm;
