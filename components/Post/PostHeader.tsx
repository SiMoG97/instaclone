import React, { useState } from "react";
import ProfilePic from "../ProfilePic";
import styles from "./postStyles.module.scss";
import Dots from "../../public/dots.svg";
import PicUsername from "../PicUsername";
import SmallPopup, { ButtonItem } from "../Popups/SmallPopup";

type props = {
  username: string;
};
const PostHeader = ({ username }: props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const optionsButtons: ButtonItem[] = [
    { text: "Repost", method: () => {}, danger: true },
    { text: "Unfollow", method: () => {}, danger: true },
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

  return (
    <>
      <div className={styles.postHeader}>
        <div>
          <PicUsername
            src="./pp.jpg"
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
      {isOptionOpen ? (
        <SmallPopup popupCloser={setIsOptionOpen} buttonList={optionsButtons} />
      ) : null}
    </>
  );
};

export default PostHeader;
