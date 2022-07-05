import { forwardRef } from "react";

import styles from "./form.module.scss";

type InputProps = {
  text: string;
  name: string;
  type?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, type, text } = props;
  return (
    <div className={`${styles.inputContainer}`}>
      <input type={type} id={name} placeholder=" " ref={ref} {...props} />
      <label htmlFor={name}>{text}</label>
    </div>
  );
});

export default Input;
