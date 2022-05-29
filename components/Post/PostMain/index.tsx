import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
import Button from "../../Button";
import CommentInput from "../CommentInput";
const PostMain = () => {
  return (
    <div className={styles.postMain}>
      <PostHeader />
      <Button mainColor={true} mainShape={true}>
        Follow
      </Button>
      <br />
      <br />
      <Button mainColor={false} mainShape={true}>
        Message
      </Button>
      <br />
      <br />
      <Button mainColor={false} mainShape={false}>
        Follow
      </Button>
      <br />
      <br />
      {/* <Button>Follow</Button> */}
      {/* <CommentInput /> */}
    </div>
  );
};

export default PostMain;
