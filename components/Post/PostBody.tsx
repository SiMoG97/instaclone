import React, { ReactNode } from "react";
import { ImagePost } from "./ImagePost";
import styles from "./postStyles.module.scss";
import { VideoPost } from "./VideoPost";

type PostBodyProps = {
  children: ReactNode;
  sources: string[];
};

const PostBody = ({ children, sources }: PostBodyProps) => {
  return (
    <div className={styles.postBody}>
      {children}
      <ImagePost src="./mediaTesting/img1.jpg" />
      {/* <VideoPost src="./mediaTesting/vid1.mp4" /> */}
    </div>
  );
};

export default PostBody;
