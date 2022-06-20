import PicUsername from "../PicUsername";
import TextArea from "../Textarea";
import styles from "./Dm.module.scss";
import ChatDetailsIcon from "../../public/ChatDetails.svg";
import ArrowLeft from "../../public/leftArrow.svg";
import ProfilePic from "../ProfilePic";

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <div className={`${styles.chatHeader} ${styles.shrinkHeader}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.arrowChat}>
            <ArrowLeft />
          </div>
          <PicUsername src="./baif.jpg" primaryText="Brahim Baif" />
        </div>
        <div>
          <ChatDetailsIcon />
        </div>
      </div>
      <div className={styles.chat}>
        <MessageChat messageTxt="aji 3endi" IsMyMessage={true} />
        <MessageChat
          contactImgSrc="./baif.jpg"
          messageTxt="okay safi 7ta nchof"
          IsMyMessage={false}
        />
        <MessageChat messageTxt="la bla matchof" IsMyMessage={true} />
        <MessageChat
          contactImgSrc="./baif.jpg"
          messageTxt="shaloom"
          IsMyMessage={false}
        />
        <MessageChat messageTxt="wassaup" IsMyMessage={true} />
      </div>
      <div className={styles.textAreaContainer}>
        <TextArea isCommentInput={false} />
      </div>
    </div>
  );
};

export default Chat;

type MessageChatProps = {
  IsMyMessage: boolean;
  messageTxt: string;
  contactImgSrc?: string;
};

const MessageChat = ({
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
