import React, { useRef, useState } from "react";
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
import { SliderDots } from "../../CommonComponents/SliderDots";

const PostsMain = () => {
  return posts.map((post, id) => <Post sources={post.sources} key={id} />);
};

type PostProps = {
  sources: string[];
};

const Post = ({ sources }: PostProps) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className={styles.postMain}>
      <PostHeader username="simo_echaarani" />
      <PostBody sources={sources} />
      <PostReactions setInputFocus={setInputFocus} />
      <PostBottomPart numberOfComments={25} numberOfLikes={10} />
      <div className={styles.commentInputContainer}>
        <Textarea
          isCommentInput={true}
          inputFocus={inputFocus}
          setInputFocus={setInputFocus}
        />
      </div>
    </div>
  );
};

const posts = [
  {
    sources: [
      "./mediaTesting/img1.jpg",
      "./mediaTesting/img5.jpg",
      "./mediaTesting/img2.jpg",
      "./mediaTesting/vid1.mp4",
      "./mediaTesting/vid2.mp4",
      "./mediaTesting/img3.jpg",
      "./mediaTesting/img4.jpg",
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

export default PostsMain;
