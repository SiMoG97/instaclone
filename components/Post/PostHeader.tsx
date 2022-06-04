import React from "react";
import ProfilePic from "../ProfilePic";
import styles from "./postStyles.module.scss";
import Dots from "../../public/dots.svg";

type props = {
  username: string;
};
const PostHeader = ({ username }: props) => {
  return (
    <div className={styles.postHeader}>
      <div>
        <ProfilePic
          src="./pp.jpg"
          animate={false}
          hasStory={true}
          seen={false}
          size="size-4"
        />
        <div className={styles.username}>{username}</div>
      </div>
      <Dots />
    </div>
  );
};

export default PostHeader;
