import { ChangeEvent, useState } from "react";
import styles from "./form.module.scss";
type props = {
  placeholder: string;
  name: string;
};

const Input = ({ placeholder, name }: props) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };
  return (
    <div className={`${styles.inputContainer} ${!isEmpty && styles.hasValue}`}>
      <label htmlFor={name}>{placeholder}</label>
      <input id={name} name={name} onChange={(e) => changeHandler(e)} />
    </div>
  );
};

export default Input;
