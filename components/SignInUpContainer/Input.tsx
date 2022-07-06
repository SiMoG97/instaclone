import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FieldError } from "react-hook-form";

import styles from "./form.module.scss";

type InputProps = {
  text: string;
  name: string;
  error: FieldError | undefined;
  type?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, type, text, error } = props;
  const [show, setShow] = useState<"show" | "hide">("show");
  return (
    <div className={`${styles.inputContainer} ${error && styles.inputError}`}>
      <input
        className={` ${type === "password" && styles.passwordInput}`}
        autoComplete="off"
        type={type}
        id={name}
        placeholder=" "
        ref={ref}
        {...props}
      />
      <label htmlFor={name}>{text}</label>
      {type === "password" && (
        <span
          className={styles.togglePass}
          onClick={(e) => {
            const passInput = e.currentTarget.offsetParent
              ?.childNodes[0] as HTMLInputElement;
            if (passInput) {
              if (passInput.type === "password") {
                passInput.type = "text";
                setShow("hide");
              } else {
                passInput.type = "password";
                setShow("show");
              }
            }
          }}
        >
          {show}
        </span>
      )}
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
});

export default Input;
