import styles from "../popup.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import IconCicle from "../../CommonComponents/IconCircle";

export type IconPopupPorps = {
  Icon: any;
  style: React.CSSProperties;
  someDropOpen: boolean;
  setSomeDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
  DropUp: JSX.Element;
  dropUpStyle?: React.CSSProperties;
  IconStyle?: React.CSSProperties;
  callback?: () => void;
};

export function IconPopup({
  Icon,
  someDropOpen,
  setSomeDropOpen,
  DropUp,
  style,
  dropUpStyle,
  IconStyle,
  callback = () => {},
}: IconPopupPorps) {
  const [active, setActive] = useState(false);
  const parent = useRef<HTMLDivElement>(null);
  const buttonOpen = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    parent,
    () => {
      setActive(false);
      setSomeDropOpen(false);
    },
    buttonOpen
  );

  const activeToggler = useCallback(() => {
    setActive((prev) => !prev);
    setSomeDropOpen((prev) => !prev);
  }, [setSomeDropOpen]);

  return (
    <div style={style} className={styles.iconPopup} onClick={callback}>
      <div
        ref={buttonOpen}
        className={`${styles.iconContainer} ${active ? styles.active : ""} ${
          someDropOpen && !active ? styles.iconOpacity : ""
        } `}
        onClick={activeToggler}
      >
        <IconCicle Icon={Icon} style={IconStyle} />
      </div>

      {active && (
        <div ref={parent} className={styles.dropUp} style={dropUpStyle}>
          {DropUp}
        </div>
      )}
    </div>
  );
}
