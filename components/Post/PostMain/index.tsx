import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
import Button from "../../Button";
import CommentInput from "../CommentInput";
import PostReactions from "../PostReactions";
import PostBody from "../PostBody";
const PostMain = () => {
  return (
    <div className={styles.postMain}>
      <PostHeader />
      <PostBody />
      <PostReactions />
      {/* <Button>Follow</Button> */}
      {/* <CommentInput /> */}
    </div>
  );
};

export default PostMain;
