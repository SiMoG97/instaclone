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
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useOnClickOutside from "../../../Hooks/useOnClickOutside";
import IconCicle from "../../IconCircle";
import RangeSlide from "../../FormComponents/RangeSlide";
import { AspectRatioDropUp } from "./AspectRatioDropUp";
import { ImgFileType } from "./";

export type ARStateType =
  | "original"
  | "oneToOne"
  | "fourToFive"
  | "sixteenToNine";

type CropStepProps = {
  files: ImgFileType[];
  setFiles: Dispatch<SetStateAction<ImgFileType[]>>;
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
  const [selectedImgNmbr, setSelectedImgNmbr] = useState(0);
  const croppingDiv = useRef<HTMLDivElement>(null);

  const originalArCalcul = useCallback((width: number, height: number) => {
    let ar = width / height;
    if (ar > 1.91) {
      ar = 1.91;
    } else if (ar < 0.8) {
      ar = 0.8;
    }
    if (ar > 1) {
      return {
        width: "100%",
        height: `calc(100% / ${ar})`,
      };
    } else if (ar < 1) {
      return {
        width: `${width * ar}`,
        height: "100%",
      };
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (files.length > 0 && croppingDiv.current) {
        const { img, scale, x, y } = files[selectedImgNmbr];
        croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
          /(\r\n|\n|\r)/gm,
          ""
        )}")`;
        croppingDiv.current.style.transform = `scale(${scale}) translate(${x},${y})`;
      }
    }, 1);
  }, [files, croppingDiv, selectedImgNmbr]);

  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div
        style={
          aspectRatio === "original"
            ? originalArCalcul(
                files[0].img.naturalWidth,
                files[0].img.naturalHeight
              )
            : {}
        }
        className={`${styles.cropArea} ${
          aspectRatio !== "original" ? styles[aspectRatio] : ""
        }`}
      >
        <div ref={croppingDiv} className={styles.imgToCrop}></div>
      </div>
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

// `url("${url.replace(/(\r\n|\n|\r)/gm, "")}")`;
