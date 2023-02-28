import React, { useState } from "react";
import ProfilePic from "../ProfilePic";
import styles from "./postStyles.module.scss";
import Dots from "../../public/dots.svg";
import PicUsername from "../PicUsername";
import SmallPopup, { ButtonItem } from "../Popups/SmallPopup";
import LeftArrow from "./../../public/leftArrow.svg";

type props = {
  username: string;
  isPopup?: boolean;
  closePopup?: () => void;
};
const PostHeader = ({
  username,
  isPopup = false,
  closePopup = () => {},
}: props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [unfollowPopup, setUnfollowPopup] = useState(false);
  const optionsButtons: ButtonItem[] = [
    { text: "Repost", method: () => {}, type: "danger" },
    {
      text: "Unfollow",
      method: () => {
        setIsOptionOpen(false);
        setUnfollowPopup(true);
      },
      type: "danger",
    },
    { text: "Go to Post", method: () => {} },
    { text: "Share to...", method: () => {} },
    { text: "Copy Link", method: () => {} },
    { text: "Embed", method: () => {} },
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

  return (
    <>
      <div className={styles.postHeader}>
        {isPopup ? (
          <div className={styles.closeCommentPhone}>
            <LeftArrow
              onClick={() => {
                closePopup();
              }}
            />
            <div>Comments</div>
          </div>
        ) : null}
        <div className={styles.authorPicAndDots}>
          <div>
            <PicUsername
              src="/pp.jpg"
              size="size-4"
              primaryText={username}
              hasStory={true}
            />
          </div>
          <Dots
            onClick={() => {
              setIsOptionOpen(true);
            }}
          />
        </div>
      </div>
      {isOptionOpen ? (
        <SmallPopup popupCloser={setIsOptionOpen} buttonList={optionsButtons} />
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

export default PostHeader;
