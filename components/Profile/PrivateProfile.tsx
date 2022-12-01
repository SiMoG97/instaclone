import React from "react";
import styles from "./profile.module.scss";
const PrivateProfile = () => {
  return (
    <div className={styles.PrivateProfile}>
      <h2>This Account is Private</h2>
      <div>Follow to see their photos and videos.</div>
    </div>
  );
};

export default PrivateProfile;
