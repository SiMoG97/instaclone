import React from "react";
import styles from "./profilePic.module.scss";
import GradientCicle from "../../public/gradientCircle.svg";
import Image from "next/image";
export type ProfilePicTypes = {
  src: string;
  size?:
    | "size-1"
    | "size-1-5"
    | "size-2"
    | "size-3"
    | "size-4"
    | "size-5"
    | "size-6";
  animate?: boolean;
  hasStory?: boolean;
  seen?: boolean;
};

const ProfilePic = ({
  src,
  size = "size-4",
  seen = false,
  animate = false,
  hasStory = false,
}: ProfilePicTypes) => {
  return (
    <div className={`${styles.profilePic} ${styles[size]}`}>
      <div className={styles.imgContainer}>
        <Image src={src} layout="fill" className={styles.someIMG} />
      </div>
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

export const TestPic = ({
  src,
  size = "size-4",
  seen = false,
  animate = false,
  hasStory = false,
}: ProfilePicTypes) => {
  return (
    <div
      style={{ position: "relative" }}
      className={`${styles.testProfilePic} ${styles[size]}`}
    >
      <div className={styles.imgContainer}>
        <Image src={src} layout="fill" className={styles.someIMG} />
        {/* <img src={src} alt="" /> */}
      </div>
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
