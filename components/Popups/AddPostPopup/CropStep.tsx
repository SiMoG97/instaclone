import styles from "../popup.module.scss";
import CropIcon from "../../../public/crop.svg";
import MagnidyingGlass from "../../../public/magnifyingGlass.svg";
import PostsIcon from "../../../public/postsIcon.svg";
import ArrowL from "../../../public/arrowL.svg";
import ArrowR from "../../../public/arrowR.svg";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import IconCircle from "../../CommonComponents/IconCircle";
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
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
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
  // const [isMouseDown, setIsMouseDown] = useState(false);
  // const mouseDownRef = useRef(false);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);

  function scaleHandler(scaleValue: number) {
    const scale = 1 + scaleValue / 100;
    if (croppingDiv.current) {
      croppingDiv.current.style.transform = `scale(${scale}) translate(${files[selectedFile].x}%,${files[selectedFile].y}%)`;
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
      console.log("updating");
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
    }
  }, []);

  type Cords = {
    startX: number;
    startY: number;
    tx: number;
    ty: number;
  };
  const cords = useRef<Cords>({
    startX: 0,
    startY: 0,
    tx: 0,
    ty: 0,
  });
  // const isPointerDown = useRef(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerDownHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log("mousedown");
    e.currentTarget.setPointerCapture(e.pointerId);
    // isPointerDown.current = true;
    setIsPointerDown(() => true);
    // document.body.style.cursor = "pointer";

    // // setIsMouseDown(true);
    // document.body.style.cursor = "grabbing";
    cords.current.startX = e.clientX;
    cords.current.startY = e.clientY;
  };

  const pointerUpHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log("mouseup");
    if (!croppingDiv.current) return;
    if (!cropAreaRef.current) return;
    setIsPointerDown(() => false);

    const {
      x: movingX,
      y: movingY,
      width,
    } = croppingDiv.current.getBoundingClientRect();

    const { x: containerX, width: containerWidth } =
      cropAreaRef.current.getBoundingClientRect();

    if (movingX > containerX) {
      // cords.current.tx = 0;
    }

    if (containerX + containerWidth > movingX + width) {
      // cords.current.tx = 0;
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
    if (!croppingDiv.current) return;
    if (!cropAreaRef.current) return;
    if (isPointerDown) {
      const { startX, startY } = cords.current;
      const {
        width,
        height,
        x: movingX,
        y: movingY,
      } = croppingDiv.current.getBoundingClientRect();
      const { x: containerX, width: containerWidth } =
        cropAreaRef.current.getBoundingClientRect();
      const { scale, x, y } = files[selectedFile];

      ///////////////////////////////////////////
      let resistanceX = 0;
      if (
        movingX > containerX ||
        containerX + containerWidth > movingX + width
      ) {
        // resistanceX = ((e.clientX - startX) * 100) / (width * 1.2);
      }
      // console.log(clientX);
      const xPercent = x - resistanceX + ((e.clientX - startX) * 100) / width;
      const YPercent = y + ((e.clientY - startY) * 100) / height;

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
      // console.log(oldX);
      // console.log("translateX: ", matrix.m41);
      // console.log("translateY: ", matrix.m42);
      // console.log(getComputedStyle(croppingDiv.current).transform);

      // console.log(e.clientX);
      // console.log(croppingDiv.current.getBoundingClientRect());
      // console.log(e.clientX - croppingDiv.current.getBoundingClientRect().x);

      // console.log(e);
    }
  };
  // useEffect(() => {
  //   if (isPointerDown) {
  //   }
  // }, [isPointerDown]);

  useEffect(() => {
    if (files.length > 0 && croppingDiv.current) {
      const { img, scale, x, y } = files[selectedFile];
      const image = document.createElement("img");
      image.src = img.src;
      // const { width, height } = originalArCalcul(
      //   image.naturalWidth,
      //   image.naturalHeight
      // );

      // croppingDiv.current.style.width = width;
      // croppingDiv.current.style.height = height;
      if (!cropAreaRef.current) return;
      let ar = image.naturalWidth / image.naturalHeight;
      if (ar > 1.91) {
        ar = 1.91;
      } else if (ar < 0.8) {
        ar = 0.8;
      }
      if (ar === 1) {
        croppingDiv.current.style.width = "100%";
        croppingDiv.current.style.height = "100%";
      } else if (ar > 1) {
        cropAreaRef.current.style.flexDirection = "column";
        croppingDiv.current.style.width = `${
          (image.naturalWidth * 100) / image.naturalHeight
        }%`;
        croppingDiv.current.style.height = "100%";
      } else if (ar < 1) {
        cropAreaRef.current.style.flexDirection = "row";
        croppingDiv.current.style.width = "100%";
        croppingDiv.current.style.height = `${
          (image.naturalHeight * 100) / image.naturalWidth
        }%`;
      }
      // if (image.naturalWidth > croppingDiv.current.offsetWidth) {
      // }
      croppingDiv.current.style.backgroundImage = `url("${img.src.replace(
        /(\r\n|\n|\r)/gm,
        ""
      )}")`;
      croppingDiv.current.style.transform = `scale(${scale}) translate(${x}%,${y}%)`;

      // let image = document.createElement("img");
      // image.id = "imgId";
      // image.src =
      //   "/uploads/media/default/0001/05/e9f3899d915c17845be51e839d5ba238f0404b07.png";
      // document.body.appendChild(image);
      // image.addEventListener("click", imgSize);
      // function imgSize() {
      //   let myImg = document.querySelector("#imgId");
      //   let realWidth = myImg.naturalWidth;
      //   let realHeight = myImg.naturalHeight;
      //   alert(
      //     "Original width=" + realWidth + ", " + "Original height=" + realHeight
      //   );
      // }
    }
  }, [files, croppingDiv, selectedFile]);

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
        <div ref={croppingDiv} className={styles.imgToCrop}></div>
        <Grid isPointerDown={isPointerDown} />
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

      {/* grid */}
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
