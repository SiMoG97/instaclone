import React from "react";
import ProfilePic from "../ProfilePic";
import styles from "./profile.module.scss";
import Button from "../Button";
import Dots from "../../public/dots.svg";
import { Stats } from "./Stats";
import { Bio } from "./Bio";

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
        <div className={styles.userName_Follow_Container}>
          <div className={styles.userName}>simo_echaarani</div>
          <Button
            style={{
              marginRight: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              fontSize: "1.3rem",
            }}
            mainColor={false}
            size={1}
          >
            Message
          </Button>
          <Button
            style={{
              marginRight: "1rem",
              fontSize: "1.3rem",
            }}
            size={1}
          >
            Follow
          </Button>
          <Dots viewBox="0 0 24 24" width="32" height="32" />
        </div>
        <Stats nbrPosts={15} nbrFollowers={245} nbrFollowing={1078} />
        <div style={{ fontWeight: "500", padding: "1rem 0" }}>
          Simo Echaarani
        </div>
        <Bio />
      </div>
    </div>
  );
};

export default ProfileHeader;
