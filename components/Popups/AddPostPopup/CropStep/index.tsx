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
import { ARStateType, ImgVidFileType, originalArCalcul } from "..";
import { IconPopup } from "../IconPopup";
import { SliderDots } from "../../../CommonComponents/SliderDots";
import SmallPopup from "../../SmallPopup";
import ZoomDropup from "./ZoomDropup";
import AdditionalPostsDropup from "./AdditionalPostsDropup";
import ArrowsAndDots from "../ArrowsAndDots";

type CropStepProps = {
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
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
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (files.length < 1 || !croppingDiv.current || !cropAreaRef.current)
      return;
    const { img } = files[selectedFile];
    const image = document.createElement("img");
    image.src = img.src;
    let imgAR = image.naturalWidth / image.naturalHeight;
    // console.log()
    const containerAR =
      cropAreaRef.current.offsetWidth / cropAreaRef.current.offsetHeight;
    console.log(containerAR);
    const container = cropAreaRef.current;
    if (containerAR === 1) {
      if (imgAR === 1) {
        const [w, h] = [container.offsetWidth, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
        // croppingDiv.current.style.width = `${w}px`;
        // croppingDiv.current.style.height = `${h}px`;
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetWidth * imgAR, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);

        // croppingDiv.current.style.width = `${w}px`;
        // croppingDiv.current.style.height = `${h}px`;
      } else if (imgAR < 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);

        // croppingDiv.current.style.width = `${w}px`;
        // croppingDiv.current.style.height = `${h}px`;
      }
      // if (videoRef.current) {
      //   videoRef.current.style.width = "100%";
      //   videoRef.current.style.height = "100%";
      // }
    } else if (containerAR > 1) {
      console.log("d5elaat");
      // cropAreaRef.current.style.flexDirection = "column";

      // let [widthStyle, heightStyle] = [
      //   (image.naturalWidth * croppingDiv.current.offsetHeight) /
      //     image.naturalHeight,
      //   croppingDiv.current.offsetHeight,
      // ];
      // if (widthStyle < cropAreaRef.current.offsetWidth) {
      //   // cropAreaRef.current.style.flexDirection = "unset";
      //   const newWidth = cropAreaRef.current.offsetWidth;
      //   const newHeight = cropAreaRef.current.offsetWidth / imgAR;
      //   console.log(croppingDiv.current.offsetWidth, imgAR);
      //   // console.log("hmm", heightStyle);
      //   // (heightStyle * cropAreaRef.current.offsetHeight) / widthStyle;
      //   widthStyle = newWidth;
      //   heightStyle = newHeight;
      // }
      // console.log(widthStyle, heightStyle, cropAreaRef.current.offsetWidth);
      // cropAreaRef.current.style.flexDirection = "column";
      // croppingDiv.current.style.width = `${widthStyle}px`;
      // croppingDiv.current.style.height = `${heightStyle}px`;
      // if (videoRef.current) {
      //   videoRef.current.style.width = widthStyle;
      //   videoRef.current.style.height = heightStyle;
      // }

      if (imgAR === 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth];
        imgVidAndContainerDimensions(w, h);
        // croppingDiv.current.style.width = `${w}px`;
        // croppingDiv.current.style.height = `${h}px`;
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);

        // croppingDiv.current.style.width = `${container.offsetWidth}px`;
        // croppingDiv.current.style.height = `${container.offsetWidth / imgAR}px`;
      } else if (imgAR < 1) {
        const [w, h] = [container.offsetWidth, container.offsetWidth / imgAR];
        imgVidAndContainerDimensions(w, h);
        // croppingDiv.current.style.width = `${container.offsetWidth}px`;
        // croppingDiv.current.style.height = `${container.offsetWidth / imgAR}px`;
      }
    } else if (containerAR < 1) {
      if (imgAR === 1) {
        const [w, h] = [container.offsetHeight, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
        // croppingDiv.current.style.width = `${container.offsetHeight}px`;
        // croppingDiv.current.style.height = `${container.offsetHeight}px`;
      } else if (imgAR > 1) {
        const [w, h] = [container.offsetHeight * imgAR, container.offsetHeight];
        imgVidAndContainerDimensions(w, h);
        croppingDiv.current.style.width = `${container.offsetHeight * imgAR}px`;
        croppingDiv.current.style.height = `${container.offsetHeight}px`;
      } else if (imgAR < 1) {
        let w = container.offsetWidth;
        let h = container.offsetWidth / imgAR;
        if (h < container.offsetHeight) {
          h = container.offsetHeight;
          w = h * imgAR;
        }
        croppingDiv.current.style.width = `${w}px`;
        croppingDiv.current.style.height = `${h}px`;
      }

      // const [widthStyle, heightStyle] = [
      //   `${cropAreaRef.current.offsetWidth}px`,
      //   `${
      //     (image.naturalHeight * cropAreaRef.current.offsetWidth) /
      //     image.naturalWidth
      //   }px`,
      // ];
      // console.log(widthStyle, heightStyle);
      // // cropAreaRef.current.style.flexDirection = "row";
      // croppingDiv.current.style.width = widthStyle;
      // croppingDiv.current.style.height = heightStyle;
      // // if (videoRef.current) {
      // //   videoRef.current.style.width = widthStyle;
      // //   videoRef.current.style.height = heightStyle;
      // // }
    }
  };

  function imgVidAndContainerDimensions(w: number, h: number) {
    if (!croppingDiv.current) return;
    croppingDiv.current.style.width = `${w}px`;
    croppingDiv.current.style.height = `${h}px`;
    if (!videoRef.current) return;
    videoRef.current.style.width = `${w}px`;
    videoRef.current.style.height = `${h}px`;
  }
  useLayoutEffect(() => {
    imageToBackground();
  }, [files, croppingDiv, selectedFile, aspectRatio]);

  useLayoutEffect(() => {
    window.addEventListener("resize", imageToBackground);
    return () => {
      window.removeEventListener("resize", imageToBackground);
    };
  }, [files, croppingDiv, selectedFile, aspectRatio]);

  // useEffect(() => {
  //   if (!croppingDiv.current) return;
  //   const { img, type, vidUrl } = files[selectedFile];
  //   if (type === "image") {
  //     croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
  //       /(\r\n|\n|\r)/gm,
  //       ""
  //     )}")`;
  //   } else {
  //     croppingDiv.current.style.backgroundImage = "";
  //     if (!videoRef.current) return;
  //     videoRef.current.src = vidUrl;
  //   }
  // }, [selectedFile, croppingDiv]);

  useLayoutEffect(() => {
    if (files.length === 0 || !croppingDiv.current) return;
    const { img, scale, x, y, type, vidUrl } = files[selectedFile];

    if (type === "image") {
      croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
        /(\r\n|\n|\r)/gm,
        ""
      )}")`;
    } else {
      croppingDiv.current.style.backgroundImage = "";
      if (!videoRef.current) return;
      videoRef.current.src = vidUrl;
    }
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
        >
          {files[selectedFile].type === "video" ? (
            <video
              autoPlay
              muted
              ref={videoRef}
              className={styles.videoCrop}
            ></video>
          ) : null}
        </div>
        <Grid isPointerDown={isPointerDown} />
      </div>
      <AspectRatioDropUp
        isOpen={someDropOpen}
        setIsOpen={setSomeDropOpen}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
      />
      {files.length > 0 && files[selectedFile].type === "image" ? (
        <ZoomDropup
          element={croppingDiv}
          files={files}
          isOpen={someDropOpen}
          selectedFile={selectedFile}
          setFiles={setFiles}
          setIsOpen={setSomeDropOpen}
        />
      ) : null}
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
