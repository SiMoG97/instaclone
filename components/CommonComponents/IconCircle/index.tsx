import { CSSProperties } from "react";
import styles from "./icon.module.scss";

type IconCicleProps = {
  Icon: any;
  style?: CSSProperties;
};
export default function IconCicle({ Icon, style = {} }: IconCicleProps) {
  return (
    <div style={style} className={`${styles.iconCicle}`}>
      <Icon />
    </div>
  );
}
