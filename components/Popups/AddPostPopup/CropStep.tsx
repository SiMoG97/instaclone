import styles from "../popup.module.scss";
import CropIcon from "../../../public/crop.svg";
import MagnidyingGlass from "../../../public/magnifyingGlass.svg";
import PostsIcon from "../../../public/postsIcon.svg";
import { CSSProperties, useRef, useState } from "react";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";

export function CropStep() {
  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div className={`${styles.cropArea} ${styles.sixteenToNine}`}></div>
      <IconPopup Icon={CropIcon} style={{ left: "2rem" }} />
      {/* <IconPopup Icon={MagnidyingGlass} style={{ left: "8rem" }} />
      <IconPopup Icon={PostsIcon} style={{ right: "2rem" }} /> */}
    </div>
  );
}

type IconPopupPorps = {
  Icon: any;
  style: CSSProperties;
};

function IconPopup({ Icon, style }: IconPopupPorps) {
  const [active, setActive] = useState(false);
  const parent = useRef<HTMLDivElement>(null);
  const buttonOpen = useRef<HTMLDivElement>(null);
  useOnClickOutside(parent, () => setActive(false), buttonOpen);

  return (
    <div style={style} className={styles.iconPopup}>
      <div
        ref={buttonOpen}
        className={`${styles.circle} ${active && styles.active}`}
        onClick={() => {
          setActive((prev) => !prev);
        }}
      >
        <Icon />
      </div>
      {active && (
        <div
          ref={parent}
          style={{
            width: "10rem",
            height: "10rem",
            position: "absolute",
            backgroundColor: "purple",
            bottom: "20rem",
            left: "5rem",
          }}
        >
          <ul>
            <li>alo</li>
            <li>fink</li>
            <li>sir</li>
            <li>t3ala</li>
            <li>mama</li>
          </ul>
        </div>
      )}
    </div>
  );
}
