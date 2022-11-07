import imgOrVideo from "../../utils/imgOrVideo";
import IconCircle from "../CommonComponents/IconCircle";
import { ImagePost } from "./ImagePost";
import styles from "./postStyles.module.scss";
import { VideoPost } from "./VideoPost";
import ArrowL from "./../../public/arrowL.svg";
import ArrowR from "./../../public/arrowR.svg";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { SliderDots } from "../CommonComponents/SliderDots";

type PostBodyProps = {
  // children: ReactNode;
  sources: string[];
};

const PostBody = ({ sources }: PostBodyProps) => {
  const postBodyRef = useRef<HTMLDivElement>(null);
  const imgVidContaienr = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState(0);
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
  const sliderResizer = useCallback(() => {
    if (imgVidContaienr.current && imgVidContaienr.current) {
      imgVidContaienr.current.style.transform = `translateX(${
        postBodyRef.current
          ? -postBodyRef.current.clientWidth * selectedImg
          : null
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
      <div className={styles.slider}>
        <div
          ref={imgVidContaienr}
          className={styles.imgVidContaienr}
          style={{
            transform: `translateX(${
              postBodyRef.current
                ? -postBodyRef.current.clientWidth * selectedImg
                : null
            }px)`,
          }}
        >
          {sources.map((src) => {
            return imgOrVideo(src) === "img" ? (
              <ImagePost src={src} />
            ) : (
              <VideoPost src={src} />
            );
          })}
        </div>
      </div>
      {selectedImg > 0 ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "scale(.8) translateY(-50%)",
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
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "scale(.8) translateY(-50%)",
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
            bottom: "-25px",
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
