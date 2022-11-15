import { calculateBorderBoxPath } from "html2canvas/dist/types/render/bound-curves";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PicUsername from "../../PicUsername";
import PopupBody from "../../Popups/PopupBody";
import PopupContainer from "../../Popups/PopupContainer";
import TextArea from "../../Textarea";
import PostBody from "../PostBody";
import PostBottomPart from "../PostBottomPart";
import PostHeader from "../PostHeader";
import PostReactions from "../PostReactions";
import styles from "./postPopup.module.scss";

type PostPopupProps = {
  sources: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostPopup = ({ sources, isOpen, setIsOpen }: PostPopupProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const imgVidSectionRef = useRef<HTMLDivElement>(null);
  const postAR = useRef(1);

  const CalculatePostContainerWidth = () => {
    if (!imgVidSectionRef.current) return;
    const height = imgVidSectionRef.current.clientHeight;
    imgVidSectionRef.current.style.width = `${height}px`;
  };

  useLayoutEffect(() => {
    CalculatePostContainerWidth();
    window.addEventListener("resize", CalculatePostContainerWidth);
    return () => {
      window.removeEventListener("resize", CalculatePostContainerWidth);
    };
  }, []);

  return (
    <>
      <PopupContainer setIsOpen={setIsOpen} isOpen={isOpen} isXout={true}>
        <PopupBody
          isXin={false}
          className={styles.postPopupContainer}
          setIsOpen={setIsOpen}
          // style={{ width: "1000px" }}
        >
          <>
            <div className={styles.imgVidSection} ref={imgVidSectionRef}>
              {/* <h1>hello</h1> */}
              <PostBody sources={sources} />
            </div>
            <div className={styles.commentSection}>
              <div className={styles.top}>
                <PostHeader username="Brahim Baif" />
                {/* <PicUsername
                  src="./baif.jpg"
                  hasStory
                  size="size-4"
                  primaryText="Brahim Baif"
                /> */}
              </div>
              <div className={styles.middle}>
                <>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                  <h1>middle</h1>
                </>
              </div>
              <div className={styles.bottom}>
                <div className={styles.reactionsTopBorder}></div>
                <PostReactions setInputFocus={setInputFocus} />
                <PostBottomPart numberOfLikes={15} />
                <div className={styles.textAreaContainer}>
                  <TextArea
                    inputFocus={inputFocus}
                    setInputFocus={setInputFocus}
                    isCommentInput
                  />
                </div>
              </div>
            </div>
          </>
        </PopupBody>
      </PopupContainer>
    </>
  );
};

export default PostPopup;
