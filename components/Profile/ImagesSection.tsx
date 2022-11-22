import Image from "next/image";
import React from "react";
import styles from "./profile.module.scss";
import Heart from "../../public/heart.svg";
import CommentIcon from "../../public/comment.svg";
import ZeroImgPlceholder from "./ZeroImgPlaceholder";

const ImagesSection = () => {
  if (!sources || sources.length === 0) {
    return <ZeroImgPlceholder />;
  }

  return (
    <div className={styles.imgSection}>
      {sources &&
        sources.map((src) => (
          <div key={src}>
            <Image src={src} layout="fill" objectFit="cover" />
            <NbrCmntLikesLayer nbrComments={15} nbrLikes={10} />
          </div>
        ))}
    </div>
  );
};

export default ImagesSection;

type NbrCmntLikesLayerProps = {
  nbrLikes: number;
  nbrComments: number;
};

const NbrCmntLikesLayer = ({
  nbrComments,
  nbrLikes,
}: NbrCmntLikesLayerProps) => {
  return (
    <>
      <div className={styles.CmntLikesLayer}>
        <div>
          <Heart /> {nbrComments}
        </div>
        <div>
          <CommentIcon /> {nbrLikes}
        </div>
      </div>
    </>
  );
};

const sources: string[] = [
  // "/mediaTesting/img1.jpg",
  // "/mediaTesting/img2.jpg",
  // "/mediaTesting/img3.jpg",
  // "/mediaTesting/img4.jpg",
  // "/mediaTesting/img5.jpg",
  // "/mediaTesting/img6.jpg",
  // "/mediaTesting/img7.jpg",
  // "/mediaTesting/img8.jpg",
  // "/mediaTesting/img9.jpg",
];
