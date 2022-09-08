import styles from "../popup.module.scss";
import CropIcon from "../../../public/crop.svg";
import MagnidyingGlass from "../../../public/magnifyingGlass.svg";
import PostsIcon from "../../../public/postsIcon.svg";
import ArrowL from "../../../public/arrowL.svg";
import ArrowR from "../../../public/arrowR.svg";
import {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import IconCicle from "../../CommonComponents/IconCircle";
import RangeSlide from "../../FormComponents/RangeSlide";
import { AspectRatioDropUp } from "./AspectRatioDropUp";
import { ImgFileType } from "./";
import { IconPopup } from "./IconPopup";
import { SliderDots } from "../../CommonComponents/SliderDots";
import SmallPopup from "../SmallPopup";

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
  const [selectedFile, setSelectedFile] = useState(0);
  const mouseDownRef = useRef(false);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  function scaleHandler(scaleValue: number) {
    const scale = 1 + scaleValue / 100;
    if (croppingDiv.current) {
      croppingDiv.current.style.transform = `scale(${scale}) translate(${files[selectedFile].x},${files[selectedFile].y})`;
    }
  }

  function nextFile() {
    setSelectedFile((i) => {
      if (i >= files.length - 1) {
        return i;
      }
      i++;
      return i;
    });
  }
  function prevFile() {
    setSelectedFile((i) => {
      if (i <= 0) {
        return 0;
      }
      i--;
      return i;
    });
  }
  function selectFile(idx: number) {
    let i = idx;
    if (idx > files.length - 1) {
      i = files.length - 1;
    } else if (idx < 0) {
      i = 0;
    }
    setSelectedFile(() => i);
  }
  function removeFile(idx: number) {
    const newFiles = files.filter((file, i) => i === idx);
    setFiles(() => newFiles);
  }

  function updateScaleValue() {
    if (croppingDiv.current) {
      const scale =
        croppingDiv.current.getBoundingClientRect().width /
        croppingDiv.current.offsetWidth;
      if (files.length > 0) {
        const newState = files.map((file, i) => {
          if (selectedFile === i) {
            return { ...file, scale };
          }
          return file;
        });
        setFiles(() => newState);
      }
    }
  }
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

  const mouseDownHandler = () => {
    mouseDownRef.current = true;
    console.log("mousedown");
  };
  const mouseUpHandler = () => {
    mouseDownRef.current = false;
    console.log("mouseup");
  };
  const mouseMouveHandler = (e: Event) => {
    if (mouseDownRef.current === true) {
      console.log(e);
      // console.log(mouseDownRef.current);
    }
  };
  useEffect(() => {
    // if(cropAreaRef.current){
    //   cropAreaRef.current.add
    // }
    window.addEventListener("mousemove", mouseMouveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMouveHandler);
    };
  }, []);
  useEffect(() => {
    if (files.length > 0 && croppingDiv.current) {
      const { img, scale, x, y } = files[selectedFile];
      croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
        /(\r\n|\n|\r)/gm,
        ""
      )}")`;
      croppingDiv.current.style.transform = `scale(${scale}) translate(${x},${y})`;
    }
  }, [files, croppingDiv, selectedFile]);

  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div
        ref={cropAreaRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        // onMouse
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
        callback={updateScaleValue}
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
            changeHandler={scaleHandler}
            lineColor="#000000"
            thumbColor="#ffffff"
            thumbSize="1.7rem"
            setedValue={
              files.length > 0 ? (files[selectedFile].scale - 1) * 100 : 0
            }
          />
        }
      />
      {/* <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={MagnidyingGlass}
        style={{ right: "2rem" }}
        dropUpStyle={{
          width: "13.2rem",
          display: "flex",
          alignItems: "center",
          padding: "1.5rem 1rem",
          borderRadius: ".8rem",
        }}
        DropUp={
          <RangeSlide
            startFrom="mid"
            changeHandler={() => {
              console.log("yay changed");
            }}
            lineColor="green"
            thumbColor="#ffffff"
          />
        }
      /> */}
      {/* <IconPopup
        someDropOpen={someDropOpen}
        setSomeDropOpen={setSomeDropOpen}
        Icon={PostsIcon}
        style={{ right: "2rem" }}
        DropUp={AspectRatioDropUp}
      /> */}
      {/* <IconCicle Icon={PostsIcon} /> */}
      {/* test div */}
      {selectedFile > 0 ? (
        <div
          style={{
            position: "absolute",
            left: ".8rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={prevFile}
        >
          <IconCicle Icon={ArrowL} />
        </div>
      ) : null}

      {selectedFile < files.length - 1 ? (
        <div
          style={{
            position: "absolute",
            right: ".8rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={nextFile}
        >
          <IconCicle Icon={ArrowR} />
        </div>
      ) : null}
      <SliderDots nbrOfDots={files.length} selectedDot={selectedFile} />
    </div>
  );
}
