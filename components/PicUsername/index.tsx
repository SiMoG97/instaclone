import styles from "./picUsername.module.scss";
import ProfilePic from "../ProfilePic";
import { ProfilePicTypes } from "../ProfilePic";
import React, { CSSProperties } from "react";

type PicUsernameProps = {
  primaryText: string;
  primaryStrong?: boolean;
  secondaryText?: string;
  isSecondarySmall?: boolean;
  isVertical?: boolean;
  secondTxtCss?: CSSProperties;
} & ProfilePicTypes;

const PicUsername = ({
  primaryText,
  primaryStrong = true,
  secondaryText,
  isSecondarySmall = false,
  isVertical = false,
  animate,
  hasStory,
  seen,
  src,
  size,
  secondTxtCss = {},
  style = {},
}: PicUsernameProps) => {
  return (
    <div
      style={style}
      className={`${styles.container} ${isVertical && styles.vertical}`}
    >
      <ProfilePic
        src={src}
        size={size}
        animate={animate}
        hasStory={hasStory}
        seen={seen}
      />
      <div className={styles.usernameContainer}>
        <div className={`${primaryStrong && styles.strong}`}>{primaryText}</div>
        {secondaryText && (
          <div
            style={secondTxtCss}
            className={`${isSecondarySmall && styles.smallTxt}`}
          >
            {secondaryText}
          </div>
        )}
      </div>
    </div>
  );
};

export default PicUsername;
