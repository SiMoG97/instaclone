import React from "react";
import Chat from "../components/Dm/Chat";
import Contacts from "../components/Dm/Contacts";
import styles from "../styles/directInbox.module.scss";

const DirectInbox = () => {
  return (
    <div className={`container ${styles.dmContainer}`}>
      <div className={styles.dmInnerContainer}>
        <Contacts />
        <Chat />
      </div>
    </div>
  );
};

export default DirectInbox;
