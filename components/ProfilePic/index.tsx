import React, { CSSProperties } from "react";
import styles from "./profilePic.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";

const StoryCircleSvg = dynamic(() => import("./StoryCircleSvg"), {
  ssr: false,
});

export type ProfilePicTypes = {
  src: string;
  size?:
    | "size-1"
    | "size-1-5"
    | "size-2"
    | "size-3"
    | "size-4"
    | "size-4-5"
    | "size-5"
    | "size-6";
  animate?: boolean;
  hasStory?: boolean;
  seen?: boolean;
  style?: CSSProperties;
};

const ProfilePic = ({
  src,
  size = "size-4",
  seen = false,
  animate = false,
  hasStory = false,
  style,
}: ProfilePicTypes) => {
  return (
    <div style={style} className={`${styles.profilePic} ${styles[size]}`}>
      <div className={styles.imgContainer}>
        <Image
          src={src}
          layout="fill"
          className={styles.someIMG}
          quality={30}
          alt="profile picture"
        />
      </div>
      {hasStory && size !== "size-6" && size !== "size-5" ? (
        <StoryCircleSvg
          className={`${seen ? styles.storySeen : ""} ${
            animate ? styles.animateCircle : ""
          }`}
        />
      ) : null}
    </div>
  );
};

export default ProfilePic;
