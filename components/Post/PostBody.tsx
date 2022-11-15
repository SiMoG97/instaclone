import imgOrVideo from "../../utils/imgOrVideo";
import IconCircle from "../CommonComponents/IconCircle";
import { ImagePost } from "./ImagePost";
import styles from "./postStyles.module.scss";
import { VideoPost } from "./VideoPost";
import ArrowL from "./../../public/arrowL.svg";
import ArrowR from "./../../public/arrowR.svg";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SliderDots } from "../CommonComponents/SliderDots";

type PostBodyProps = {
  // children: ReactNode;
  sources: string[];
};

const PostBody = ({ sources }: PostBodyProps) => {
  const postBodyRef = useRef<HTMLDivElement>(null);
  const imgVidContaienr = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState(0);
  // change this t0 ref
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseActions = useRef({
    startX: 0,
    endX: 0,
  });

  function nextImg() {
    setSelectedImg((i) => {
      if (i >= sources.length - 1) {
        return i;
      }
      i++;
      return i;
    });
  }
  function prevImg() {
    setSelectedImg((i) => {
      if (i <= 0) {
        return 0;
      }
      i--;
      return i;
    });
  }
  function touchDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!imgVidContaienr.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsMouseDown(true);
    if (postBodyRef.current) {
      mouseActions.current.startX = e.clientX;
    }
  }
  function touchUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!postBodyRef.current) return;
    if (!imgVidContaienr.current) return;
    setIsMouseDown(false);
    mouseActions.current.endX = e.clientX;
    const { endX, startX } = mouseActions.current;
    let distance = endX - startX;
    const postMiddle = postBodyRef.current.clientWidth / 2;
    if (Math.abs(distance) > postMiddle) {
      if (distance > 0) {
        prevImg();
        if (selectedImg === 0 && distance > 0) {
          distance = 0;
        }
      } else {
        nextImg();
        if (selectedImg === sources.length - 1) {
          distance = 0;
        }
      }
      imgVidContaienr.current.style.transform = `translateX(${
        -postBodyRef.current.clientWidth * selectedImg + distance
      }px)`;
    } else {
      setTimeout(() => {
        if (!imgVidContaienr.current || !postBodyRef.current) return;

        imgVidContaienr.current.style.transform = `translateX(${
          -postBodyRef.current.clientWidth * selectedImg
        }px)`;
      }, 0);
    }
  }
  function touchSwipe(
    e: React.MouseEvent<HTMLDivElement> & React.PointerEvent<HTMLDivElement>
  ) {
    if (!imgVidContaienr.current) return;
    if (!postBodyRef.current) return;
    if (isMouseDown) {
      let x = e.clientX;
      let slidePos = slidePositionCalc(x);
      imgVidContaienr.current.style.transform = `translateX(${slidePos}px)`;
    }
  }
  const slidePositionCalc = (x: number) => {
    if (!imgVidContaienr.current) return;
    if (!postBodyRef.current) return;

    const { clientWidth: postWidth } = postBodyRef.current;
    const { startX } = mouseActions.current;
    let slidePos: number;

    if (-postWidth * selectedImg + x - startX < 0) {
      if (
        -postWidth * selectedImg + x - startX <
        -postWidth * (sources.length - 1)
      ) {
        slidePos = -postWidth * (sources.length - 1);
      } else {
        slidePos = -postWidth * selectedImg + x - startX;
      }
    } else {
      slidePos = 0;
    }
    return slidePos;
  };

  const sliderResizer = useCallback(() => {
    if (imgVidContaienr.current && postBodyRef.current) {
      imgVidContaienr.current.style.transition = "0";
      imgVidContaienr.current.style.transform = `translateX(${
        -postBodyRef.current.clientWidth * selectedImg
      }px)`;
    }
  }, [selectedImg]);
  useLayoutEffect(() => {
    const postContainer = postBodyRef.current;
    if (postContainer) {
      window.addEventListener("resize", sliderResizer);
    }
    return () => {
      if (postContainer) {
        window.removeEventListener("resize", sliderResizer);
      }
    };
  }, [sliderResizer]);

  return (
    <div ref={postBodyRef} className={styles.postBody}>
      <div
        className={styles.slider}
        // onMouseDown={touchDown}
        onPointerDown={touchDown}
        onPointerMove={touchSwipe}
        onPointerUp={touchUp}
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={imgVidContaienr}
          className={`${styles.imgVidContaienr} ${
            isMouseDown ? "" : styles.transition
          } `}
          style={{
            transform: `translateX(${
              postBodyRef.current
                ? -postBodyRef.current.clientWidth * selectedImg
                : null
            }px)`,
          }}
        >
          {sources.map((src, i) => {
            return imgOrVideo(src) === "img" ? (
              <ImagePost src={src} key={src} />
            ) : (
              <VideoPost src={src} key={src} isSelected={i === selectedImg} />
            );
          })}
        </div>
      </div>
      {selectedImg > 0 ? (
        <div
          className={styles.sliderArrows}
          style={{
            left: "10px",
          }}
          onClick={prevImg}
        >
          <IconCircle Icon={ArrowL} light={true} />
        </div>
      ) : (
        <></>
      )}
      {selectedImg < sources.length - 1 ? (
        <div
          className={styles.sliderArrows}
          style={{
            right: "10px",
          }}
          onClick={nextImg}
        >
          <IconCircle Icon={ArrowR} light={true} />
        </div>
      ) : (
        <></>
      )}
      {sources.length > 1 ? (
        <SliderDots
          nbrOfDots={sources.length}
          selectedDot={selectedImg}
          style={{
            bottom: "15px",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostBody;

// btn.addEventListener("click", (e) => {
//   console.log(e.pointerType);
// });
