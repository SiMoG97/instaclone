import { routes, SettingsRoutesType } from "..";
import styles from "../settings.module.scss";
import Link from "next/link";

type PropsType = {
  route: SettingsRoutesType;
};
export function SettingsLeftbar({ route }: PropsType) {
  return (
    <div className={`${styles.sideBar} `}>
      <ul>
        {routes.map((item) => (
          <li key={item} className={`${route === item ? styles.active : ""}`}>
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
