import React from "react";
import { Contacts, Chat } from "../components/Dm/";
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
