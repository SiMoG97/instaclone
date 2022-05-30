import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
import Button from "../../Button";
import CommentInput from "../CommentInput";
const PostMain = () => {
  return (
    <div className={styles.postMain}>
      <PostHeader />
      {/* <Button>Follow</Button> */}
      {/* <CommentInput /> */}
    </div>
  );
};

export default PostMain;
