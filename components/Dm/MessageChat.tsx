import styles from "./Dm.module.scss";
import ProfilePic from "../ProfilePic";

export type MessageChatProps = {
  IsMyMessage: boolean;
  messageTxt: string;
  contactImgSrc?: string;
};
export const MessageChat = ({
  IsMyMessage,
  messageTxt,
  contactImgSrc = "",
}: MessageChatProps) => {
  return (
    <div className={`${styles.messageChat} ${IsMyMessage && styles.myMessage}`}>
      {!IsMyMessage && (
        <div style={{ alignSelf: "end" }}>
          <ProfilePic src={contactImgSrc} size="size-5" />
        </div>
      )}
      <div className={styles.messageTxt}>{messageTxt}</div>
    </div>
  );
};
