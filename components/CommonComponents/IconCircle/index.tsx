import { CSSProperties } from "react";
import styles from "./icon.module.scss";

type IconCicleProps = {
  Icon: any;
  style?: CSSProperties;
  light?: boolean;
};
export default function IconCircle({
  light = false,
  Icon,
  style = {},
}: IconCicleProps) {
  return (
    <div
      style={style}
      className={`${styles.iconCicle} ${light ? styles.light : ""}`}
    >
      <Icon />
    </div>
  );
}
