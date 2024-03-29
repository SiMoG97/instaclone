import { calculateBorderBoxPath } from "html2canvas/dist/types/render/bound-curves";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PicUsername from "../../PicUsername";
import PopupBody from "../../Popups/PopupBody";
import PopupContainer from "../../Popups/PopupContainer";
import TextArea from "../../TextareaInput";
import CommentAndReplies, { CommentAndRepliesProps } from "./Comment";
import PostBody from "../PostBody";
import PostBottomPart from "../PostBottomPart";
import PostHeader from "../PostHeader";
import PostReactions from "../PostReactions";
import styles from "./postPopup.module.scss";
import Link from "next/link";
import useWindowEventHandler from "../../../Hooks/useWindowEventHandler";
import imgOrVideo from "../../../utils/imgOrVideo";

type PostPopupProps = {
  sources: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostPopup = ({ sources, isOpen, setIsOpen }: PostPopupProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const imgVidSectionRef = useRef<HTMLDivElement>(null);
  const [selectedReplyUser, setSelectedRepluUser] = useState("");

  const postAR = useRef(1);

  const CalculatePostContainerWidth = () => {
    if (!imgVidSectionRef.current) return;
    // if (imgOrVideo(sources[0]) === "img") {
    const img = new Image();
    img.src = sources[0];
    const ar = img.naturalWidth / img.naturalHeight;
    // } else if (imgOrVideo(sources[0]) === "vid") {
    // const vid = document.createElement("video");
    // vid.src = sources[0];

    // }
    const height = imgVidSectionRef.current.clientHeight;
    if (ar >= 1) {
      imgVidSectionRef.current.style.width = `${height}px`;
    } else {
      const width = height * ar;
      imgVidSectionRef.current.style.width = `${width}px`;
    }
  };
  useLayoutEffect(() => {
    CalculatePostContainerWidth();
  }, []);

  useWindowEventHandler(CalculatePostContainerWidth);

  function closePostPopup() {
    setIsOpen(() => false);
  }

  return (
    <>
      <PopupContainer setIsOpen={setIsOpen} isOpen={isOpen} isXout={true}>
        <PopupBody
          isXin={false}
          className={styles.postPopupContainer}
          setIsOpen={setIsOpen}
        >
          <>
            <div className={styles.imgVidSection} ref={imgVidSectionRef}>
              <PostBody sources={sources} />
            </div>
            <div className={styles.commentSection}>
              <div className={styles.top}>
                <PostHeader
                  username="Brahim Baif"
                  isPopup
                  closePopup={closePostPopup}
                />
              </div>
              <div className={styles.middle}>
                {CommentsArr.length === 0 ? (
                  <div className={styles.noComments}>
                    <div>
                      <h2>No comments yet</h2>
                      <div>Start the conversation</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {CommentsArr.map((comment, i) => {
                      return (
                        <CommentAndReplies
                          username={comment.username}
                          commentText={comment.commentText}
                          nbrLikes={comment.nbrLikes}
                          replies={comment.replies}
                          picSrc={comment.picSrc}
                          key={i}
                          setSelectedRepluUser={setSelectedRepluUser}
                        />
                      );
                    })}
                  </>
                )}
              </div>
              <div className={styles.bottom}>
                <div className={styles.reactionsTopBorder}></div>
                <PostReactions setInputFocus={setInputFocus} />
                <PostBottomPart numberOfLikes={10} />
                <div className={styles.textAreaContainer}>
                  {true ? (
                    <TextArea
                      inputFocus={inputFocus}
                      setInputFocus={setInputFocus}
                      isCommentInput
                      selectedReplyUser={selectedReplyUser}
                    />
                  ) : (
                    <div className={styles.loginLink}>
                      <Link href="login">
                        <a>Log in </a>
                      </Link>
                      to like or comment.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        </PopupBody>
      </PopupContainer>
    </>
  );
};

const CommentsArr: Omit<CommentAndRepliesProps, "setSelectedRepluUser">[] = [
  {
    username: "timo_lostora",
    picSrc: "/baif.jpg",
    commentText: "olah ila zwin",
    nbrLikes: 0,
    replies: [
      {
        username: "maradona_rip",
        picSrc: "/pdp.jfif",
        commentText: "sir f7alk jiti 5ayb",
        nbrLikes: 2,
      },
      {
        username: "skran_3yan",
        picSrc: "/baif.jpg",
        commentText: "ila knti rajl 5rej m3aya 1v1",
        nbrLikes: 1,
      },
    ],
  },
  {
    username: "Simo_echaarani",
    picSrc: "/pp.jpg",
    commentText: "sir f7alk jiti 5ayb",
    nbrLikes: 10,
    replies: [],
  },
  {
    username: "thebrahimbaif",
    picSrc: "/baif.jpg",
    commentText: "sir f7alk jiti 5ayb",
    nbrLikes: 2,
    replies: [],
  },
];

export default PostPopup;
