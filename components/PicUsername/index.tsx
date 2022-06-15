import styles from "./picUsername.module.scss";
import ProfilePic from "../ProfilePic";
import { ProfilePicTypes } from "../ProfilePic";

const PicUsername = ({
  primaryText,
  primaryStrong = true,
  secondaryText,
}: PicUsernameProps) => {
  return (
    <div className={styles.container}>
      <ProfilePic src="./pp.jpg" />
      <div>
        <div>userNmae</div>
        {secondaryText && <div>second text</div>}
      </div>
    </div>
  );
};

export default PicUsername;
type PicUsernameProps = {
  primaryText: string;
  primaryStrong?: boolean;
  secondaryText?: string;
} & ProfilePicTypes;
