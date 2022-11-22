import Image from "next/image";
import styles from "./profile.module.scss";

function ZeroImgPlceholder() {
  return (
    <div className={styles.zeroImgContainer}>
      <div>
        <h3>Start capturing and sharing your moments.</h3>
        <p>Get the app to share your first photo or video.</p>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/zeroImgPlaceholder.jpg"
          //   width="380"
          //   height="380"
          layout="fill"
          objectFit="cover"
          //   fill
          className={styles.customImg}
        />
        {/* <Image
          src="/zeroImgPlaceholder.jpg"
          width="100%"
          height="100%"
          objectFit="contain"
        /> */}
        {/* <img src="/zeroImgPlaceholder.jpg" /> */}
      </div>
    </div>
  );
}

export default ZeroImgPlceholder;
