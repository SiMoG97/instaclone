import React from "react";
import styles from "./postStyles.module.scss";
import HeartIcon from "../../public/heart.svg";
import SendIcon from "../../public/send.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import CommentIcon from "../../public/Comment.svg";
import { SliderDots } from "../CommonComponents/SliderDots";

const PostReactions = () => {
  return (
    <div className={styles.postReactions}>
      <div>
        <HeartIcon />
        <CommentIcon />
        <SendIcon />
      </div>
      <BookmarkIcon width="24" height="24" />
    </div>
  );
};

export default PostReactions;
