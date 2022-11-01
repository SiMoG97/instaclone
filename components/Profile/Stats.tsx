import React, { useState } from "react";
import FollowPopup from "../Popups/FollowPopup";
import styles from "./profile.module.scss";

type statsProps = {
  nbrPosts: number;
  nbrFollowers: number;
  nbrFollowing: number;
};

export const Stats = ({ nbrPosts, nbrFollowers, nbrFollowing }: statsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowersActive, setIsFollowersActive] = useState(false);
  return (
    <>
      <div className={styles.stats}>
        <div>
          <span>{nbrPosts}</span> post{nbrPosts !== 1 && "s"}
        </div>
        <div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsOpen(true);
              setIsFollowersActive(true);
            }}
          >
            <span>{nbrFollowers}</span> follower{nbrFollowers !== 1 && "s"}
          </div>
        </div>
        <div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsOpen(true);
              setIsFollowersActive(false);
            }}
          >
            <span>{nbrFollowing}</span> following
          </div>
        </div>
      </div>
      <FollowPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFollowersActive={isFollowersActive}
        setIsFollowersActive={setIsFollowersActive}
      />
    </>
  );
};
