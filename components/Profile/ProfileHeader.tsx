import React from "react";
import ProfilePic from "../ProfilePic";
import styles from "./profile.module.scss";
import Button from "../Button";

const ProfileHeader = () => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profilePicContainer}>
        <ProfilePic
          src="./pp.jpg"
          size="size-1"
          hasStory={true}
          animate={true}
        />
      </div>
      <div className={styles.userInfo}>
        <div>
          <div>simo_echaarani</div>
          <Button mainColor={false} size={2}>
            Message
          </Button>
          <Button size={2}>Follow</Button>
        </div>
        <div>
          <div>14 posts</div>
          <div>229 followers</div>
          <div>1,039 following</div>
        </div>
        <div>
          <div>Simo Echaarani</div>
          <div>
            Front-end developer
            <br />
            Gm : echaaranimohamed@gmail.com
            <br />
            Fb : SiMo Echaarani
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
