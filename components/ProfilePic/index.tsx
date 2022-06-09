import React from "react";
import styles from "./profilePic.module.scss";
import GradientCicle from "../../public/gradientCircle.svg";
type props = {
  src: string;
  size: string;
  animate: boolean;
  hasStory: boolean;
  seen: boolean;
};

const ProfilePic = ({ src, size, seen, animate, hasStory }: props) => {
  // if (size === "size-6" || size === "size-5" || !hasStory) {
  //   return (
  //     <div className={`${styles.profilePic}  ${styles[size]}`}>
  //       <img src={src} alt="Profile picture" />
  //     </div>
  //   );
  // }
  return (
    <div className={`${styles.profilePic} ${styles[size]}`}>
      <img src={src} alt="Profile picture" />
      {hasStory && size !== "size-6" && size !== "size-5" && (
        <GradientCicle
          className={`${seen && styles.storySeen} ${
            animate && styles.animateCircle
          }`}
        />
      )}
    </div>
  );
};

export default ProfilePic;
