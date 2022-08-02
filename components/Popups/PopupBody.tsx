import { ReactElement } from "react";
import styles from "./popup.module.scss";
import CrossX from "../../public/cross.svg";
import { SetIsOpenType } from "./PopupContainer";

type PopupBodyTypes = {
  popupHeader: string;
  children: ReactElement;
  setIsOpen: SetIsOpenType;
};
const PopupBody = ({ children, popupHeader, setIsOpen }: PopupBodyTypes) => {
  return (
    <div className={`${styles.popupContainer}`}>
      <div style={{ position: "relative" }} className={styles.popUpHeader}>
        {popupHeader}
        <CrossX
          style={{
            position: "absolute",
            right: "2rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default PopupBody;
