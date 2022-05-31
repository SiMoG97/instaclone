import React from "react";
import ProfilePic from "../ProfilePic";
import styles from "./postStyles.module.scss";
import Dots from "../../public/dots.svg";

const PostHeader = () => {
  return (
    <div className={styles.postHeader}>
      <ProfilePic
        src="./pp.jpg"
        animate={false}
        hasStory={true}
        seen={false}
        size="size-4"
      />
      <Dots />
    </div>
  );
};

export default PostHeader;
