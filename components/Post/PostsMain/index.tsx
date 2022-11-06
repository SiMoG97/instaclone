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
import IconCicle from "../../CommonComponents/IconCircle";
import IconCircle from "../../CommonComponents/IconCircle";
import ArrowL from "../../../public/arrowL.svg";
import ArrowR from "../../../public/arrowR.svg";
import { SliderDots } from "../../CommonComponents/SliderDots";

const PostsMain = () => {
  // const [selectedImg]
  const posts = [
    {
      sources: [
        "./mediaTesting/img1.jpg",
        "./mediaTesting/vid1.mp4",
        "./mediaTesting/img2.jpg",
        "./mediaTesting/vid2.mp4",
        "./mediaTesting/img3.jpg",
        "./mediaTesting/img4.jpg",
        "./mediaTesting/img5.jpg",
      ],
    },
    {
      sources: ["./mediaTesting/img1.jpg"],
    },
    {
      sources: ["./mediaTesting/vid1.mp4"],
    },
    {
      sources: ["./mediaTesting/img5.jpg", "./mediaTesting/vid1.mp4"],
    },
  ];
  return (
    <>
      {posts.map((post, id) => (
        <div className={styles.postMain} key={id}>
          <PostHeader username="simo_echaarani" />
          <PostBody sources={post.sources}>
            {/* {id % 2 === 0 ? (
              <ImagePost src="./mediaTesting/img1.jpg" />
            ) : (
              <VideoPost src="./mediaTesting/vid1.mp4" />
            )} */}
            {/* <IconCicle  /> */}
            {
              // selectedImg
            }
            <IconCircle
              Icon={ArrowR}
              light={true}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "scale(.8) translateY(-50%)",
              }}
            />
            <IconCircle
              Icon={ArrowL}
              light={true}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "scale(.8) translateY(-50%)",
              }}
            />
          </PostBody>
          <PostReactions nbrOfDots={post.sources.length} selectedDot={2} />
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
