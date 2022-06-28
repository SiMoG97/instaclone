import React from "react";
import styles from "./profile.module.scss";

type statsProps = {
  nbrPosts: number;
  nbrFollowers: number;
  nbrFollowing: number;
};

export const Stats = ({ nbrPosts, nbrFollowers, nbrFollowing }: statsProps) => {
  return (
    <div className={styles.stats}>
      <div>
        <span>{nbrPosts}</span> post{nbrPosts !== 1 && "s"}
      </div>
      <div>
        <span>{nbrFollowers}</span> follower{nbrFollowers !== 1 && "s"}
      </div>
      <div>
        <span>{nbrFollowing}</span> following
      </div>
    </div>
  );
};
