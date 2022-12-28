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
import { ARStateType, ImgFileType, originalArCalcul } from "..";
import { IconPopup } from "../IconPopup";
import { SliderDots } from "../../../CommonComponents/SliderDots";
import SmallPopup from "../../SmallPopup";
import ZoomDropup from "./ZoomDropup";
import AdditionalPostsDropup from "./AdditionalPostsDropup";
import ArrowsAndDots from "../ArrowsAndDots";

type CropStepProps = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  nextFile: () => void;
  prevFile: () => void;
  selectedFileIdRef: React.MutableRefObject<string>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  aspectRatio: ARStateType;
  setAspectRatio: React.Dispatch<React.SetStateAction<ARStateType>>;
};
export function CropStep({
  files,
  setFiles,
  nextFile,
  prevFile,
  selectedFile,
  setSelectedFile,
  selectedFileIdRef,
  setStep,
  setAlertMessage,
  aspectRatio,
  setAspectRatio,
}: CropStepProps) {
  const [someDropOpen, setSomeDropOpen] = useState(false);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  const cords = useRef({
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
  };

  const PointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!croppingDiv.current || !cropAreaRef.current) return;
    if (!isPointerDown) return;
    const { startX, startY } = cords.current;
    const {
      width,
      height,
      x: movingX,
    } = croppingDiv.current.getBoundingClientRect();
    const { x: containerX, width: containerWidth } =
      cropAreaRef.current.getBoundingClientRect();
    const { scale, x, y } = files[selectedFile];

    if (movingX > containerX || containerX + containerWidth > movingX + width) {
      cords.current.counterX++;
      if (cords.current.counterX === 1) {
        let newX = cords.current.xBorder;
        if (containerX + containerWidth > movingX + width) {
          newX = -newX;
        }
      }
    } else {
      cords.current.counterX = 0;
    }
    const distX = ((e.clientX - startX) * 100) / width;
    const distY = ((e.clientY - startY) * 100) / height;

    const xPercent = x + distX;
    const YPercent = y + distY;

    croppingDiv.current.style.transform = `scale(${scale}) translate(${xPercent}%,${YPercent}%)`;
    cords.current.tx = xPercent;
    cords.current.ty = YPercent;
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
        setSelectedFile={setSelectedFile}
        selectedFileIdRef={selectedFileIdRef}
        setStep={setStep}
        selectedFile={selectedFile}
        setAlertMessage={setAlertMessage}
      />
      <ArrowsAndDots
        files={files}
        nextFile={nextFile}
        prevFile={prevFile}
        selectedFile={selectedFile}
      />
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
