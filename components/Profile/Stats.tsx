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
          <span className={styles.numbers}>{nbrPosts}</span>
          <span>post{nbrPosts !== 1 && "s"}</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
            setIsFollowersActive(true);
          }}
        >
          <span className={styles.numbers}>{nbrFollowers}</span>
          <span>follower{nbrFollowers !== 1 && "s"}</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
            setIsFollowersActive(false);
          }}
        >
          <span className={styles.numbers}>{nbrFollowing}</span>
          <span>following</span>
        </div>
      </div>
      {isOpen ? (
        <FollowPopup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isFollowersActive={isFollowersActive}
          setIsFollowersActive={setIsFollowersActive}
        />
      ) : null}
    </>
  );
};
