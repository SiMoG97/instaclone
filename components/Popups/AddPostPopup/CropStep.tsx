import styles from "../popup.module.scss";
import CropIcon from "../../../public/crop.svg";
import MagnidyingGlass from "../../../public/magnifyingGlass.svg";
import PostsIcon from "../../../public/postsIcon.svg";
import OriginalIcon from "../../../public/AspectRatioIcons/originalAR.svg";
import RectangleIcon from "../../../public/AspectRatioIcons/rectangle.svg";
import RectangleVIcon from "../../../public/AspectRatioIcons/rectangleV.svg";
import OneToOneIcon from "../../../public/AspectRatioIcons/oneToOne.svg";
import {
  CSSProperties,
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import IconCicle from "../../IconCircle";
import RangeSlide from "../../FormComponents/RangeSlide";

export function CropStep() {
  const [someDropOpen, setSomeDropOpen] = useState(false);
  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div className={`${styles.cropArea} ${styles.sixteenToNine}`}></div>
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={CropIcon}
        style={{ left: "2rem" }}
        DropUp={<AspectRatioDropUp />}
      />
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={MagnidyingGlass}
        style={{ left: "8rem" }}
        dropUpStyle={customstyleTobeDeleted}
        DropUp={
          <RangeSlide
            startFrom="mid"
            changeHandler={() => {
              console.log("yay changed");
            }}
            lineColor="var(--txt-c-3)"
            thumbColor="var(--txt-c-1)"
          />
        }
      />
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={MagnidyingGlass}
        style={{ right: "2rem" }}
        dropUpStyle={{ ...customstyleTobeDeleted, right: 0, left: "auto" }}
        DropUp={
          <RangeSlide
            startFrom="left"
            changeHandler={() => {
              console.log("yay changed");
            }}
            lineColor="var(--txt-c-3)"
            thumbColor="var(--txt-c-1)"
          />
        }
      />
      {/* <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={PostsIcon}
        style={{ right: "2rem" }}
        DropUp={AspectRatioDropUp}
      /> */}
      {/* <IconCicle Icon={PostsIcon} /> */}
    </div>
  );
}

type IconPopupPorps = {
  Icon: any;
  style: CSSProperties;
  someDropOpen: boolean;
  setSomeDropOpen: Dispatch<SetStateAction<boolean>>;
  DropUp: JSX.Element;
  dropUpStyle?: CSSProperties;
};

function IconPopup({
  Icon,
  someDropOpen,
  setSomeDropOpen,
  DropUp,
  style,
  dropUpStyle,
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
    <div style={style} className={styles.iconPopup}>
      <div
        ref={buttonOpen}
        className={`${styles.iconContainer} ${active ? styles.active : ""} ${
          someDropOpen && !active ? styles.iconOpacity : ""
        } `}
        onClick={activeToggler}
      >
        <IconCicle Icon={Icon} />
      </div>

      {active && (
        <div ref={parent} className={styles.dropUp} style={dropUpStyle}>
          {DropUp}
        </div>
      )}
    </div>
  );
}

function AspectRatioDropUp() {
  return (
    <ul className={styles.dropUpIElmContainer}>
      <li>
        <div>Original</div>
        <OriginalIcon />
      </li>
      <li>
        <div>1:1</div>
        <OneToOneIcon />
      </li>
      <li>
        <div>4:5</div>
        <RectangleVIcon />
      </li>
      <li>
        <div>16:9</div>
        <RectangleIcon />
      </li>
    </ul>
  );
}

// RangeSlide;
const customstyleTobeDeleted = {
  width: "30rem",
  height: "10rem",
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  background: "transparent",
};
