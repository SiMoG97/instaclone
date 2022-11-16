import React, { useState } from "react";
import ProfilePic from "../../ProfilePic";
import styles from "./postPopup.module.scss";
import Heart from "../../../public/smallHeart.svg";
import Dots from "../../../public/dots.svg";
import { showLikes } from "../PostBottomPart";

type CommentType = {
  username: string;
  picSrc: string;
  nbrLikes: number;
  commentText: string;
};

type CommentDescProps = CommentType & {
  isComment: boolean;
};

export const CommentDesc = ({
  isComment,
  picSrc,
  username,
  commentText,
  nbrLikes,
}: CommentDescProps) => {
  return (
    <div className={styles.commentDescription}>
      <ProfilePic src={picSrc} size={"size-4"} />
      <div className={styles.middlePart}>
        <div className={styles.text}>
          <span className={styles.username}>{username}</span>
          {commentText}
        </div>
        <div className={styles.bottomPart}>
          <span>2d</span>
          {isComment ? (
            <>
              {nbrLikes > 0 ? <span>{showLikes(nbrLikes)}</span> : null}

              <span>Reply</span>
              <span className={styles.dots}>
                <Dots />
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isComment ? (
        <div className={styles.heart}>
          <span>
            <Heart
              onClick={() => {
                console.log("clicked");
              }}
            />
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

type CommentAndRepliesProps = CommentType & { replies: CommentType[] };

const CommentAndReplies = ({
  nbrLikes,
  picSrc,
  replies,
  username,
  commentText,
}: CommentAndRepliesProps) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      <CommentDesc
        isComment
        nbrLikes={nbrLikes}
        picSrc={picSrc}
        username={username}
        commentText={commentText}
      />
      {replies && replies.length > 0 ? (
        <>
          <div
            className={styles.repliesButton}
            onClick={() => {
              setShowReplies((prev) => !prev);
            }}
          >
            <span className={styles.line}></span>
            {!showReplies ? `View replies (${replies.length})` : "Hide replies"}
          </div>
          {showReplies ? (
            <div className={styles.replies}>
              {replies.map((reply) => {
                return (
                  <CommentDesc
                    isComment
                    nbrLikes={reply.nbrLikes}
                    picSrc={reply.picSrc}
                    username={reply.username}
                    commentText={reply.commentText}
                  />
                );
              })}
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default CommentAndReplies;
