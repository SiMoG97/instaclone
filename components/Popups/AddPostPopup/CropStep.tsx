import styles from "../popup.module.scss";
import CropIcon from "../../../public/crop.svg";
import MagnidyingGlass from "../../../public/magnifyingGlass.svg";
import PostsIcon from "../../../public/postsIcon.svg";
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
import { AspectRatioDropUp } from "./AspectRatioDropUp";

export type ARStateType =
  | "original"
  | "oneToOne"
  | "fourToFive"
  | "sixteenToNine";

type CropStepProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  nextStep: () => void;
  prevStep: () => void;
};
export function CropStep({
  files,
  setFiles,
  nextStep,
  prevStep,
}: CropStepProps) {
  const [someDropOpen, setSomeDropOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<ARStateType>("oneToOne");

  const originalArCalcul = (width: number, height: number) => {
    return {
      width: "100%",
      height: "40%",
    };
  };
  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div
        style={aspectRatio === "original" ? originalArCalcul(800, 50) : {}}
        className={`${styles.cropArea} ${
          aspectRatio !== "original" ? styles[aspectRatio] : ""
        }`}
      ></div>
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={CropIcon}
        style={{ left: "2rem" }}
        DropUp={
          <AspectRatioDropUp
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        }
      />
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={MagnidyingGlass}
        style={{ left: "8rem" }}
        dropUpStyle={{
          width: "13.2rem",
          display: "flex",
          alignItems: "center",
          padding: "1.5rem 1rem",
          borderRadius: ".8rem",
        }}
        DropUp={
          <RangeSlide
            startFrom="left"
            changeHandler={() => {
              console.log("yay changed");
            }}
            lineColor="#000000"
            thumbColor="#ffffff"
            thumbSize="1.7rem"
          />
        }
      />
      <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={MagnidyingGlass}
        style={{ right: "2rem" }}
        // dropUpStyle={{ ...customstyleTobeDeleted, right: 0, left: "auto" }}
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

// RangeSlide;
// const customstyleTobeDeleted = ;
