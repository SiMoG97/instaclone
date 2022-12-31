import styles from "../popup.module.scss";

type SidebarContainerProps = {
  step: number;
  children: React.ReactNode;
};

const SidebarContainer = ({ step, children }: SidebarContainerProps) => {
  return (
    <div
      className={`${styles.sidebarContainer} ${
        step > 1 ? styles.sidebarFullWidth : ""
      }`}
    >
      {children}
    </div>
  );
};

export default SidebarContainer;
