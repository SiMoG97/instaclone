import React from "react";
import styles from "./profilePic.module.scss";
import GradientCicle from "../../public/gradientCircle.svg";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { SVGUniqueID } from "react-svg-unique-id";

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
        <Image
          src={src}
          layout="fill"
          className={styles.someIMG}
          quality={30}
        />
      </div>
      {hasStory && size !== "size-6" && size !== "size-5" && (
        // <CircleComponent
        //   className={`${seen ? styles.storySeen : ""} ${
        //     animate ? styles.animateCircle : ""
        //   }`}
        // />
        <CircleComponent
          className={`${seen ? styles.storySeen : ""} ${
            animate ? styles.animateCircle : ""
          }`}
        />
      )}
    </div>
  );
};

const CircleComponent = ({ className = "" }: { className: string }) => {
  // const id = uuidv4();
  return (
    <SVGUniqueID>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className={className}
      >
        <defs>
          <linearGradient
            id="prefix__bga"
            x1="0.03"
            y1="0.68"
            x2="0.97"
            y2="0.32"
          >
            <stop offset="0%" stopColor="#FCAF45" />
            <stop offset="55%" stopColor="#e1306c" />
            <stop offset="87%" stopColor="#833ab4" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" stroke="url(#prefix__bga)" />
      </svg>
    </SVGUniqueID>
  );
};

export default ProfilePic;
