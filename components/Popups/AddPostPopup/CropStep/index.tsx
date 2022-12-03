import styles from "../../popup.module.scss";
import CropIcon from "../../../../public/crop.svg";
import PostsIcon from "../../../../public/postsIcon.svg";
import ArrowL from "../../../../public/arrowL.svg";
import ArrowR from "../../../../public/arrowR.svg";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import IconCircle from "../../../CommonComponents/IconCircle";
import RangeSlide from "../../../FormComponents/RangeSlide";
import AspectRatioDropUp from "./AspectRatioDropUp";
import { ImgFileType } from "..";
import { IconPopup } from "../IconPopup";
import { SliderDots } from "../../../CommonComponents/SliderDots";
import SmallPopup from "../../SmallPopup";
import ZoomDropup from "./ZoomDropup";
import AdditionalPostsDropup from "./AdditionalPostsDropup";

export type ARStateType =
  | "original"
  | "oneToOne"
  | "fourToFive"
  | "sixteenToNine";

type CropStepProps = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
  selectedFile: number;
  nextFile: () => void;
  prevFile: () => void;
};
export function CropStep({
  files,
  setFiles,
  nextFile,
  prevFile,
  selectedFile,
}: CropStepProps) {
  const [someDropOpen, setSomeDropOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<ARStateType>("oneToOne");
  const croppingDiv = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  function removeFile(idx: number) {
    const newFiles = files.filter((file, i) => i === idx);
    setFiles(() => newFiles);
  }

  const originalArCalcul = useCallback((width: number, height: number) => {
    let ar = width / height;
    if (ar === 1) {
      return {
        width: "100%",
        height: "100%",
      };
    }
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
        // width: `calc(${width}px * ${ar})`,
        width: `calc(100% * ${ar})`,
        height: "100%",
      };
    } else {
      return {
        width: "auto",
        height: "auto",
      };
    }
  }, []);

  type Cords = {
    startX: number;
    startY: number;
    tx: number;
    ty: number;
    xBorder: number;
    yBorder: number;
    counterX: number;
    passedX: boolean;
    counterY: number;
    passedY: boolean;
  };
  const cords = useRef<Cords>({
    startX: 0,
    startY: 0,
    tx: 0,
    ty: 0,
    xBorder: 0,
    yBorder: 0,
    counterX: 0,
    passedX: false,
    counterY: 0,
    passedY: false,
  });
  // const isPointerDown = useRef(false);

  const [isPointerDown, setIsPointerDown] = useState(false);

  const pointerDownHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPointerDown(() => true);
    cords.current.startX = e.clientX;
    cords.current.startY = e.clientY;
  };

  // const pointerUpHandler = (e: React.PointerEvent<HTMLDivElement>) => {
  const pointerUpHandler = () => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    setIsPointerDown(() => false);

    const {
      x: movingX,
      y: movingY,
      width,
      height,
    } = croppingDiv.current.getBoundingClientRect();

    const {
      x: containerX,
      y: containerY,
      width: containerWidth,
      height: containerHeight,
    } = cropAreaRef.current.getBoundingClientRect();

    if (movingX > containerX) {
      cords.current.tx = cords.current.xBorder;
    }
    if (containerX + containerWidth > movingX + width) {
      cords.current.tx = -cords.current.xBorder;
    }
    if (movingY > containerY) {
      cords.current.ty = cords.current.yBorder;
    }
    if (containerY + containerHeight > movingY + height) {
      cords.current.ty = -cords.current.yBorder;
    }

    const newFiles = files.map((file, i) => {
      if (selectedFile === i) {
        return { ...file, x: cords.current.tx, y: cords.current.ty };
      }
      return file;
    });
    setFiles(() => newFiles);
    // if (cropAreaRef.current && croppingDiv.current) {
    //   const { x } = cropAreaRef.current.getBoundingClientRect();
    //   const { x: cX } = croppingDiv.current.getBoundingClientRect();

    //   console.log(x, cX);
    // }
    // isPointerDown.current = false;
    // setIsMouseDown(false);

    // console.log(cords.current.startX, cords.current.startY);
  };

  const PointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    if (isPointerDown) {
      const { startX, startY } = cords.current;
      const {
        width,
        height,
        x: movingX,
        y: movingY,
      } = croppingDiv.current.getBoundingClientRect();
      const {
        x: containerX,
        y: containerY,
        width: containerWidth,
        height: containerHeight,
      } = cropAreaRef.current.getBoundingClientRect();
      const { scale, x, y } = files[selectedFile];

      ///////////////////////////////////////////
      let resistanceX = 1;
      let resistanceY = 1;
      // interact(croppingDiv.current)
      if (
        movingX > containerX ||
        containerX + containerWidth > movingX + width
      ) {
        // cords.current.passedX = true;
        cords.current.counterX++;
        if (cords.current.counterX === 1) {
          let newX = cords.current.xBorder;
          if (containerX + containerWidth > movingX + width) {
            newX = -newX;
          }
          // console.log(newX);
          // const newFiles = files.map((file, i) => {
          //   if (selectedFile === i) {
          //     return { ...file, x: newX };
          //   }
          //   return file;
          // });
          // setFiles(() => newFiles);
          // console.log(x);
        }
        // resistanceX = 10;
      } else {
        resistanceX = 1;
        cords.current.counterX = 0;
        // cords.current.passedX = false;
      }

      // if (
      //   movingY > containerY ||
      //   containerY + containerHeight > movingY + height
      // ) {
      //   console.log("hmmmm");
      // }

      // if (
      //   movingY > containerY ||
      //   containerY + containerHeight > movingY + height
      // ) {
      //   cords.current.passedY = true;
      //   cords.current.counterY++;
      //   if ((cords.current.passedY = true && cords.current.counterY === 1)) {
      //     let newY = cords.current.yBorder;
      //     if (containerY + containerHeight > movingY + height) {
      //       newY = -newY;
      //     }
      //     const newFiles = files.map((file, i) => {
      //       if (selectedFile === i) {
      //         return { ...file, y: newY };
      //       }
      //       return file;
      //     });
      //     setFiles(() => newFiles);
      //   }
      //   resistanceY = 10;
      // } else {
      //   resistanceY = 1;
      //   cords.current.counterY = 0;
      //   cords.current.passedY = false;
      // }
      // console.log(resistanceX);
      console.log(x);

      const distX = ((e.clientX - startX) * 100) / width;
      const distY = ((e.clientY - startY) * 100) / height;
      // console.log(x + distX / resistanceX);

      const xPercent = x + distX / resistanceX;
      const YPercent = y + distY / resistanceY;

      croppingDiv.current.style.transform = `scale(${scale}) translate(${xPercent}%,${YPercent}%)`;
      cords.current.tx = xPercent;
      cords.current.ty = YPercent;

      // console.log(xx > cX);
      //  {
      //   // console.log(xx, cX);
      //   console.log();
      // }

      // }

      // console.log(`${((e.clientX - startX) * 100) / width}%`);
      // var style = getComputedStyle(croppingDiv.current);
      // var matrix = new WebKitCSSMatrix(style.transform);
      // matrix.translateSelf(200, 0, 0);
      // const oldX = (matrix.m41 * 100) / width;
      // console.log(getComputedStyle(croppingDiv.current).transform);

      // console.log(e.clientX);
      // console.log(croppingDiv.current.getBoundingClientRect());
      // console.log(e.clientX - croppingDiv.current.getBoundingClientRect().x);

      // console.log(e);
    }
  };

  const imageToBackground = () => {
    if (files.length === 0 || !croppingDiv.current) return;
    const { img } = files[selectedFile];
    const image = document.createElement("img");
    image.src = img.src;
    if (!cropAreaRef.current) return;
    let ar = image.naturalWidth / image.naturalHeight;
    if (ar === 1) {
      cropAreaRef.current.style.flexDirection = "column";
      croppingDiv.current.style.width = "100%";
      croppingDiv.current.style.height = "100%";
    } else if (ar > 1) {
      cropAreaRef.current.style.flexDirection = "column";
      croppingDiv.current.style.width = `${
        (image.naturalWidth * cropAreaRef.current.offsetHeight) /
        image.naturalHeight
      }px`;
      croppingDiv.current.style.height = `${cropAreaRef.current.offsetHeight}px`;
    } else if (ar < 1) {
      cropAreaRef.current.style.flexDirection = "row";
      croppingDiv.current.style.width = `${cropAreaRef.current.offsetWidth}px`;
      croppingDiv.current.style.height = `${
        (image.naturalHeight * cropAreaRef.current.offsetWidth) /
        image.naturalWidth
      }px`;
    }
  };

  useLayoutEffect(() => {
    imageToBackground();
  }, [files, croppingDiv, selectedFile, aspectRatio]);

  useLayoutEffect(() => {
    window.addEventListener("resize", imageToBackground);
    return () => {
      window.removeEventListener("resize", imageToBackground);
    };
  }, [files, croppingDiv, selectedFile, aspectRatio]);

  useLayoutEffect(() => {
    if (files.length === 0 || !croppingDiv.current) return;

    const { img, scale, x, y } = files[selectedFile];

    croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
      /(\r\n|\n|\r)/gm,
      ""
    )}")`;
    croppingDiv.current.style.transform = `scale(${scale}) translate(${x}%,${y}%)`;
    setTimeout(() => {
      if (!croppingDiv.current || !cropAreaRef.current) return;
      const imageWidth = croppingDiv.current.offsetWidth * scale;
      const hiddenPartsWidth = imageWidth - cropAreaRef.current.offsetWidth;
      cords.current.xBorder = ((hiddenPartsWidth / 2) * 100) / imageWidth;

      const imageHeight = croppingDiv.current.offsetHeight * scale;
      const hiddenPartsHeight = imageHeight - cropAreaRef.current.offsetHeight;
      cords.current.yBorder = ((hiddenPartsHeight / 2) * 100) / imageHeight;
    }, 300);
  }, [files, croppingDiv, aspectRatio, selectedFile]);

  return (
    <div className={`${styles.stepContainer} ${styles.cropContainer}`}>
      <div
        ref={cropAreaRef}
        onPointerMove={PointerMoveHandler}
        onPointerDown={pointerDownHandler}
        onPointerUp={pointerUpHandler}
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
        <div
          ref={croppingDiv}
          style={isPointerDown ? {} : { transition: "transform .3s" }}
          className={styles.imgToCrop}
        ></div>
        <Grid isPointerDown={isPointerDown} />
      </div>
      <div className={styles.bottomBtnsContainer}>
        <div>
          <AspectRatioDropUp
            isOpen={someDropOpen}
            setIsOpen={setSomeDropOpen}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
          <ZoomDropup
            element={croppingDiv}
            files={files}
            isOpen={someDropOpen}
            selectedFile={selectedFile}
            setFiles={setFiles}
            setIsOpen={setSomeDropOpen}
          />
          <AdditionalPostsDropup
            isOpen={someDropOpen}
            setIsOpen={setSomeDropOpen}
            files={files}
            setFiles={setFiles}
          />
        </div>
      </div>

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
          <IconCircle Icon={ArrowL} />
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
          <IconCircle Icon={ArrowR} />
        </div>
      ) : null}
      <SliderDots nbrOfDots={files.length} selectedDot={selectedFile} />
    </div>
  );
}

const Grid = ({ isPointerDown }: { isPointerDown: boolean }) => {
  return (
    <div className={styles.grid} style={isPointerDown ? { opacity: 1 } : {}}>
      <div className={styles.line} style={{ top: `${100 / 3}%` }}></div>
      <div className={styles.line} style={{ top: `${(100 / 3) * 2}%` }}></div>
      <div
        className={`${styles.line} ${styles.horizontal}`}
        style={{ left: `${100 / 3}%` }}
      ></div>
      <div
        className={`${styles.line} ${styles.horizontal}`}
        style={{ left: `${(100 / 3) * 2}%` }}
      ></div>
    </div>
  );
};

// getBoundingClientRect()

/*  check right */
// (right out) should be less than or equal (right in) which means  (right in ) >= (right out)

/*  check left */
// (left in) sould be less than or equal (left out) which neans  (left out) >= (left in)

/*  check top */
// (top in) sould be less than or equal (top out) which neans  (top out) >= (top in)

/*  check bottom */
// (bottom out) sould be less than or equal (bottom in) which neans  (bottom in) >= (bottom out)
