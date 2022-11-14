import { CSSProperties, ReactElement, useCallback } from "react";
import styles from "./popup.module.scss";
import CrossX from "../../public/cross.svg";
import { SetIsOpenType } from "./PopupContainer";

type PopupBodyTypes = {
  popupHeader?: string | ReactElement;
  children: ReactElement;
  setIsOpen: SetIsOpenType;
  isXin?: boolean;
  style?: CSSProperties;
  className?: string;
};
const PopupBody = ({
  children,
  popupHeader,
  setIsOpen,
  isXin = true,
  style,
  className = "",
}: PopupBodyTypes) => {
  const closePopup = useCallback(
    function () {
      setIsOpen(() => false);
    },
    [setIsOpen]
  );

  return (
    <div
      style={{ ...style }}
      className={`${styles.popupContainer} ${className}`}
    >
      {popupHeader ? (
        <div
          style={{
            position: "relative",
          }}
          className={styles.popUpHeader}
        >
          {popupHeader}
          {isXin && (
            <CrossX
              style={{
                position: "absolute",
                right: "2rem",
                cursor: "pointer",
              }}
              onClick={closePopup}
            />
          )}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default PopupBody;
