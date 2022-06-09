import { ReactElement, useLayoutEffect, useState } from "react";
import styles from "./PopupContainer.module.scss";

type props = {
  popupHeader: string;
  children: ReactElement;
};

const PopupContainer = ({ children, popupHeader }: props) => {
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
        className={styles.SemiTransparentLayer}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setIsOpen(false);
          }
        }}
      >
        <div
          className={`${styles.popupContainer} ${
            isOpen && styles.showMobilePopup
          }`}
        >
          <div className={styles.popUpHeader}>{popupHeader}</div>
          {children}
        </div>
      </div>
    );
  return <></>;
};

export default PopupContainer;
