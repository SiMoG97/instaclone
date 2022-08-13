import { CSSProperties, ReactElement, useCallback } from "react";
import styles from "./popup.module.scss";
import CrossX from "../../public/cross.svg";
import { SetIsOpenType } from "./PopupContainer";

type PopupBodyTypes = {
  popupHeader: string | ReactElement;
  children: ReactElement;
  setIsOpen: SetIsOpenType;
  isXin?: boolean;
  style?: CSSProperties;
};
const PopupBody = ({
  children,
  popupHeader,
  setIsOpen,
  isXin = true,
  style,
}: PopupBodyTypes) => {
  const closePopup = useCallback(
    function () {
      setIsOpen(() => false);
    },
    [setIsOpen]
  );

  return (
    <div style={{ ...style }} className={`${styles.popupContainer}`}>
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
      {children}
    </div>
  );
};

export default PopupBody;
