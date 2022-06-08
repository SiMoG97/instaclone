import { ReactElement, useLayoutEffect, useState } from "react";
import styles from "./PopupContainer.module.scss";

type props = {
  children: ReactElement;
};

const PopupContainer = ({ children }: props) => {
  const [isOpen, setIsOpen] = useState(true);

  useLayoutEffect(() => {
    const body = window.document.body;
    const nav = document.querySelector<HTMLElement>("body nav");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollbarWidth}px`;
      if (nav !== null) nav.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      body.style.overflow = "unset";
      body.style.paddingRight = "0px";
      if (nav !== null) nav.style.paddingRight = `0px`;
    }
  }, [isOpen]);

  if (isOpen)
    return (
      <div
        className={styles.container}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setIsOpen(false);
          }
        }}
      >
        {children}
      </div>
    );
  return <></>;
};

export default PopupContainer;
