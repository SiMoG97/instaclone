import PicUsername from "../PicUsername";
import TextArea from "../Textarea";
import styles from "./Dm.module.scss";
import ChatDetailsIcon from "../../public/ChatDetails.svg";
import ArrowLeft from "../../public/leftArrow.svg";

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
      <div className={styles.chat}></div>
      <div className={styles.textAreaContainer}>
        <TextArea isCommentInput={false} />
      </div>
    </div>
  );
};

export default Chat;
