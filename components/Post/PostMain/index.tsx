import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
import Button from "../../Button";
import Textarea from "../../Textarea";
import PostReactions from "../PostReactions";
import PostBody from "../PostBody";
const PostMain = () => {
  return (
    <div className={styles.postMain}>
      <PostHeader username="simo_echaarani" />
      <PostBody />
      <PostReactions />
      {/* <Button>Follow</Button> */}
      {/* <CommentInput /> */}
      <div className={styles.commentInputContainer}>
        <Textarea isCommentInput={true} />
      </div>
    </div>
  );
};

export default PostMain;
