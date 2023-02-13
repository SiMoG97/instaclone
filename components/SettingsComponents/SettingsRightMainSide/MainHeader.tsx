import styles from "../settings.module.scss";
import Burger from "../../../public/hamburger.svg";

type Props = {
  title: string;
  openNav: () => void;
};
export function MainHeader({ title, openNav }: Props) {
  return (
    <div className={`${styles.mainHeader} ${styles.header}`}>
      <div className={styles.icon} onClick={openNav}>
        <Burger />
      </div>
      <div>{title}</div>
      <div></div>
    </div>
  );
}
