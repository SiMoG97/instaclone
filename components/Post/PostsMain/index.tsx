import React from "react";
import styles from "./PostMain.module.scss";
import PostHeader from "../PostHeader";
import Button from "../../Button";
import Textarea from "../../Textarea";
import PostReactions from "../PostReactions";
import PostBody from "../PostBody";
import { ImagePost } from "../ImagePost";
import { VideoPost } from "../VideoPost";
import PostBottomPart from "../PostBottomPart";
const PostsMain = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((post, id) => (
        <div className={styles.postMain} key={id}>
          <PostHeader username="simo_echaarani" />
          <PostBody>
            {id % 2 === 0 ? (
              <ImagePost src="./mediaTesting/img1.jpg" />
            ) : (
              <VideoPost src="./mediaTesting/vid1.mp4" />
            )}
          </PostBody>
          <PostReactions />
          <PostBottomPart numberOfComments={25} numberOfLikes={10} />
          <div className={styles.commentInputContainer}>
            <Textarea isCommentInput={true} />
          </div>
        </div>
      ))}
    </>
  );
};

export default PostsMain;
