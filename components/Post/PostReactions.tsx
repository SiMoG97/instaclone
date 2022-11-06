import React from "react";
import styles from "./postStyles.module.scss";
import HeartIcon from "../../public/heart.svg";
import SendIcon from "../../public/send.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import CommentIcon from "../../public/Comment.svg";
import { SliderDots } from "../CommonComponents/SliderDots";

type PostReactionsType = {
  nbrOfDots: number;
  selectedDot: number;
};
const PostReactions = ({ nbrOfDots, selectedDot }: PostReactionsType) => {
  return (
    <div className={styles.postReactions}>
      <div>
        <HeartIcon />
        <CommentIcon />
        <SendIcon />
      </div>
      {nbrOfDots > 1 ? (
        <SliderDots
          nbrOfDots={nbrOfDots}
          selectedDot={selectedDot}
          style={{
            top: "15px",
            bottom: "auto",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <></>
      )}
      <BookmarkIcon width="24" height="24" />
    </div>
  );
};

export default PostReactions;
