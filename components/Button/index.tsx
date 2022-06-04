import React from "react";
import Styles from "./button.module.scss";

type props = {
  mainShape?: boolean;
  mainColor?: boolean;
  focus?: boolean;
  size?: number;
  bold?: boolean;
  children: string;
};

const index = ({
  mainShape = true,
  mainColor = true,
  focus = true,
  size = 1,
  bold = false,
  children,
}: props) => {
  const sizeClass = `size-${size}`;
  return (
    <button
      className={`${Styles.button} ${Styles[sizeClass]} ${
        mainShape ? Styles.mainShape : Styles.secondaryShape
      } ${mainColor ? Styles.mainColor : Styles.secondaryColor} ${
        !focus && Styles.notFocus
      } ${bold && Styles.bold}`}
    >
      {children}
    </button>
  );
};

export default index;
