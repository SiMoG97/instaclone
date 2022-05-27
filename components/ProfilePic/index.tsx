import React from "react";
import styles from "./profilePic.module.scss";
import GradientCicle from "../../public/gradientCircle.svg";
type props = {
  src: string;
  size: string;
  animate: boolean;
  hasStory: boolean;
  seen: boolean;
  // className?: string;
};

// const TestingPP = ({ src, size }: props) => {
const ProfilePic = ({ src, size, seen, animate, hasStory }: props) => {
  console.log(styles);
  if (size === "size-6" || size === "size-5" || !hasStory) {
    return (
      <div className={`${styles.profilePic}  ${styles[size]}`}>
        <img src={src} alt="Profile picture" />
      </div>
    );
  }
  return (
    <div className={`${styles.profilePic} ${styles[size]}`}>
      <img src={src} alt="Profile picture" />
      <GradientCicle
        className={`${seen && styles.storySeen} ${
          animate && styles.animateCircle
        }`}
      />
    </div>
  );
};

export default ProfilePic;
