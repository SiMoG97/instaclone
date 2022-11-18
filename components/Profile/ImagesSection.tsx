import Image from "next/image";
import React from "react";
import styles from "./profile.module.scss";
const ImagesSection = () => {
  return (
    <div className={styles.imgSection}>
      <div>
        <Image src={"/mediaTesting/img9.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img6.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img7.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img3.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img4.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img5.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img2.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img1.jpg"} layout="fill" objectFit="cover" />
      </div>
      <div>
        <Image src={"/mediaTesting/img8.jpg"} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default ImagesSection;
