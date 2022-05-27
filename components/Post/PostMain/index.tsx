import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
const PostMain = () => {
  return (
    <div className={styles.postMain}>
      <PostHeader />
    </div>
  );
};

export default PostMain;
