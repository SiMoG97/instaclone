import React from "react";
import styles from "./postStyles.module.scss";
import HeartIcon from "../../public/heart.svg";
import SendIcon from "../../public/send.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import CommentIcon from "../../public/comment.svg";
import { SliderDots } from "../CommonComponents/SliderDots";

type PostReactionsProps = {
  setInputFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostReactions = ({ setInputFocus }: PostReactionsProps) => {
  return (
    <div className={styles.postReactions}>
      <div>
        <HeartIcon />
        <CommentIcon
          onClick={() => {
            setInputFocus(true);
          }}
        />
        <SendIcon />
      </div>
      <BookmarkIcon width="24" height="24" />
    </div>
  );
};

export default PostReactions;
