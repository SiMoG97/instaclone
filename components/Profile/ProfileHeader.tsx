import React, { useState } from "react";
import ProfilePic from "../ProfilePic";
import styles from "./profile.module.scss";
import Button from "../Button";
import Dots from "../../public/dots.svg";
import { Stats } from "./Stats";
import { Bio } from "./Bio";
import SmallPopup, { ButtonItem } from "../Popups/SmallPopup";
import SettingsSvg from "../../public/settings.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

type ProfileHeaderType = {
  username: string;
  fullName: string;
  picSrc: string;
};

const ProfileHeader = ({ username, fullName, picSrc }: ProfileHeaderType) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [unfollowPopup, setUnfollowPopup] = useState(false);
  // these constants should be changed with server data
  // const isMyProfile = false;
  const isMyProfile = true;
  const isFollowing = false;
  // const isFollowing = true;
  // these constants should be changed with server data

  const optionsButtons: ButtonItem[] = [
    { text: "Block", method: () => {}, type: "danger" },
    { text: "Restrict", method: () => {}, type: "danger" },
    { text: "Report", method: () => {}, type: "danger" },
    {
      text: "Cancel",
      method: () => {
        setIsOptionOpen(false);
      },
    },
  ];
  const myProfileOptions: ButtonItem[] = [
    { text: "Change Password", method: () => {} },
    { text: "QR Code", method: () => {} },
    { text: "Apps and Websites", method: () => {} },
    { text: "Notifications", method: () => {} },
    { text: "Privacy and Security", method: () => {} },
    { text: "Supetvision", method: () => {} },
    { text: "Login Activity", method: () => {} },
    { text: "Emails from Instaclone", method: () => {} },
    { text: "Report a Problem", method: () => {} },
    { text: "Log Out", method: () => {} },
    {
      text: "Cancel",
      method: () => {
        setIsOptionOpen(false);
      },
    },
  ];
  const unfollowButtons: ButtonItem[] = [
    { text: "Unfollow", method: () => {}, type: "danger" },
    {
      text: "Cancel",
      method: () => {
        setUnfollowPopup(false);
      },
    },
  ];
  const { data: session, status } = useSession();
  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicContainer}>
          <ProfilePic
            src={picSrc}
            size="size-1"
            hasStory={true}
            animate={true}
          />
          <ProfilePic
            src={picSrc}
            size="size-1-5"
            hasStory={true}
            animate={true}
          />
        </div>
        <div className={styles.userName_Follow_Container}>
          <div className={styles.userName}>{username}</div>
          <div className={styles.profileButtons}>
            {isMyProfile ? (
              <>
                <Link href="/Settings">
                  <a>
                    <Button
                      style={{
                        marginRight: "1rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        fontSize: "1.3rem",
                        fontWeight: "600",
                      }}
                      mainColor={false}
                      size={1}
                    >
                      Edit Profile
                    </Button>
                  </a>
                </Link>
                <SettingsSvg
                  width="24"
                  height="24"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsOptionOpen(true);
                  }}
                />
              </>
            ) : isFollowing ? (
              <>
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
                <Dots
                  style={{ cursor: "pointer" }}
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  className={styles.dots}
                  onClick={() => {
                    setIsOptionOpen(true);
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  style={{
                    marginRight: "1rem",
                    fontSize: "1.3rem",
                  }}
                  size={1}
                >
                  Follow
                </Button>
                <Dots
                  style={{ cursor: "pointer" }}
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  className={styles.dots}
                  onClick={() => {
                    setIsOptionOpen(true);
                  }}
                />
              </>
            )}

            {/* <SettingsSvg width="24" height="24" /> */}
          </div>
        </div>
        <Stats nbrPosts={15} nbrFollowers={245} nbrFollowing={1078} />
        <div className={styles.fullName}>{fullName}</div>
        <Bio />
      </div>
      {/* <div className={styles.userInfo}></div> */}
      {isOptionOpen ? (
        <SmallPopup
          popupCloser={setIsOptionOpen}
          buttonList={isMyProfile ? myProfileOptions : optionsButtons}
        />
      ) : null}
      {unfollowPopup ? (
        <SmallPopup
          popupCloser={setUnfollowPopup}
          buttonList={unfollowButtons}
          titleOrPic={<ProfilePic src="/baif.jpg" size="size-1-5" />}
          text={`Unfollow ${username}`}
        />
      ) : null}
    </>
  );
};

export default ProfileHeader;
