import PicUsername from "../PicUsername";
import TextArea from "../Textarea";
import styles from "./Dm.module.scss";
import ChatDetailsIcon from "../../public/ChatDetails.svg";
import ArrowLeft from "../../public/leftArrow.svg";
import ProfilePic from "../ProfilePic";
import { useLayoutEffect, useRef, useState } from "react";
import useChatScroll from "../Hooks/ChatScrollHook";

const Chat = () => {
  ////////////
  const [messages, setMessages] = useState([
    <MessageChat messageTxt="fin jiti " IsMyMessage={true} />,
  ]);
  const addChatClick = () => {
    setMessages([
      ...messages,
      <MessageChat messageTxt="fin jiti " IsMyMessage={true} />,
    ]);
  };
  //////////////
  const chatRef = useChatScroll(messages);

  return (
    // <div className={styles.chatContainer}>
    <div className={styles.chatContainer} style={{ position: "relative" }}>
      <button onClick={addChatClick} style={{ position: "absolute", top: "0" }}>
        add chat test
      </button>
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
      <div ref={chatRef} className={styles.chat}>
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
        <MessageChat messageTxt="fin mchiti" IsMyMessage={true} />
        <MessageChat messageTxt="fin mchiti" IsMyMessage={true} />
        <MessageChat messageTxt="fin mchiti" IsMyMessage={true} />
        <MessageChat messageTxt="fin jiti " IsMyMessage={true} />
        <MessageChat
          messageTxt="why are you ignoring me ?"
          IsMyMessage={true}
        />
        <MessageChat messageTxt="7ta t5rej" IsMyMessage={true} />
        <MessageChat messageTxt="mabiti tji 3andi" IsMyMessage={true} />
        {messages.map((elm, i) => elm)}
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
