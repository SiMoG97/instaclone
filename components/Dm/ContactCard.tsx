import React from "react";
import PicUsername from "../PicUsername";
import styles from "./Dm.module.scss";
type contactCardProps = {
  newMessage?: boolean;
};

export const ContactCard = ({ newMessage = false }: contactCardProps) => {
  //   const newMessage = true;
  return (
    <div className={styles.contactCardContainer}>
      <PicUsername
        src="/baif.jpg"
        size="size-2"
        primaryText="Brahim Baif"
        secondaryText="Sent you a message"
        secondTxtCss={
          newMessage ? { fontWeight: "600", color: "var(--txt-c-1)" } : {}
        }
      />
      <div className={styles.dotTimerContainer}>
        <div className={styles.timer}>10h</div>
        {newMessage && <div className={styles.dot} />}
      </div>
    </div>
  );
};
