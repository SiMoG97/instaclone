import { routes, SettingsRoutesType } from "..";
import CrossSvg from "../../../public/cross.svg";
import styles from "../settings.module.scss";
import Link from "next/link";

type PropsType = {
  route: SettingsRoutesType;
  closeNav: () => void;
  isOpen: boolean;
};
export function SettingsLeftbar({ route, closeNav, isOpen }: PropsType) {
  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.open : ""} `}>
      <div className={`${styles.navHeader} ${styles.header}`}>
        <div className={styles.cross} onClick={closeNav}>
          <CrossSvg />
        </div>
        <div>Settings</div>
        <div></div>
      </div>
      <ul>
        {routes.map((item) => (
          <li
            key={item}
            className={`${route === item ? styles.active : ""}`}
            onClick={closeNav}
          >
            <Link
              href={{
                pathname: "/Settings",
                query: { edit: item },
              }}
            >
              <a>{item.split("_").join(" ")}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
