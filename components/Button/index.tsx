import React, { CSSProperties } from "react";
import Styles from "./button.module.scss";

type props = {
  mainShape?: boolean;
  mainColor?: boolean;
  focus?: boolean;
  size?: number;
  bold?: boolean;
  style?: CSSProperties;
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => any;
};

const index = ({
  mainShape = true,
  mainColor = true,
  focus = true,
  size = 1,
  bold = false,
  style = {},
  type = "button",
  children,
  onClick,
}: props) => {
  const sizeClass = `size-${size}`;
  return (
    <button
      type={type}
      style={style}
      className={`${Styles.button} ${Styles[sizeClass]} ${
        mainShape ? Styles.mainShape : Styles.secondaryShape
      } ${mainColor ? Styles.mainColor : Styles.secondaryColor} ${
        !focus && Styles.notFocus
      } ${bold && Styles.bold}`}
      // onClick={onclick}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default index;
