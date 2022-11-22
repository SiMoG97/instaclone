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
          layout="fill"
          alt="no post to show placeholder image"
          quality={40}
        />
      </div>
    </div>
  );
}

export default ZeroImgPlceholder;
