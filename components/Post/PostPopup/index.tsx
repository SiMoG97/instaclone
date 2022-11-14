import React, { useState } from "react";
import PicUsername from "../../PicUsername";
import PopupBody from "../../Popups/PopupBody";
import PopupContainer from "../../Popups/PopupContainer";
import TextArea from "../../Textarea";
import PostBottomPart from "../PostBottomPart";
import PostHeader from "../PostHeader";
import PostReactions from "../PostReactions";
import styles from "./postPopup.module.scss";

type PostPopupProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostPopup = ({ isOpen, setIsOpen }: PostPopupProps) => {
  const [inputFocus, setInputFocus] = useState(false);

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
            <div className={styles.imgVidSection}>{/* <h1>hello</h1> */}</div>
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
