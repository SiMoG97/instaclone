import React from "react";
import Styles from "./button.module.scss";

type props = {
  mainShape: boolean;
  mainColor: boolean;
  children: string;
};

const index = ({ mainShape, mainColor, children }: props) => {
  return (
    <button
      className={`${Styles.button} ${
        mainShape ? Styles.mainShape : Styles.secondaryShape
      } ${mainColor ? Styles.mainColor : Styles.secondaryColor}`}
    >
      {children}
    </button>
  );
};

export default index;
