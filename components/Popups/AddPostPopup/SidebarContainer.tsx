import styles from "../popup.module.scss";
import EditSidebar from "./EditStep/EditSideBar";

type SidebarContainerProps = {
  step: number;
};

const SidebarContainer = ({ step }: SidebarContainerProps) => {
  return (
    <div
      className={`${styles.sidebarContainer} ${
        step > 1 ? styles.sidebarFullWidth : ""
      }`}
    >
      {step === 2 ? <EditSidebar /> : null}
    </div>
  );
};

export default SidebarContainer;
