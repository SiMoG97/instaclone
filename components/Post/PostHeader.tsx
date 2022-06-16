import React from "react";
import ProfilePic from "../ProfilePic";
import styles from "./postStyles.module.scss";
import Dots from "../../public/dots.svg";
import PicUsername from "../PicUsername";

type props = {
  username: string;
};
const PostHeader = ({ username }: props) => {
  return (
    <div className={styles.postHeader}>
      <div>
        <PicUsername
          src="./pp.jpg"
          size="size-4"
          primaryText={username}
          hasStory={true}
        />
      </div>
      <Dots />
    </div>
  );
};

export default PostHeader;
