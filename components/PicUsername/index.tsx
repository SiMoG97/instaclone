import styles from "./picUsername.module.scss";
import ProfilePic from "../ProfilePic";
import { ProfilePicTypes } from "../ProfilePic";

type PicUsernameProps = {
  primaryText: string;
  primaryStrong?: boolean;
  secondaryText?: string;
  isSecondarySmall?: boolean;
  isVertical?: boolean;
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
}: PicUsernameProps) => {
  return (
    <div className={`${styles.container} ${isVertical && styles.vertical}`}>
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
          <div className={`${isSecondarySmall && styles.smallTxt}`}>
            {secondaryText}
          </div>
        )}
      </div>
    </div>
  );
};

export default PicUsername;
