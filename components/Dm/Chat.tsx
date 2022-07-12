import PicUsername from "../PicUsername";
import TextArea from "../Textarea";
import styles from "./Dm.module.scss";
import ChatDetailsIcon from "../../public/ChatDetails.svg";
import ArrowLeft from "../../public/leftArrow.svg";
import { useLayoutEffect, useRef, useState } from "react";
import useChatScroll from "../../Hooks/useChatScrollHook";
import { Details, MessageChat } from "./";
// import { MessageChat } from "./MessageChat";

export const Chat = () => {
  const [showDetails, setShowDetails] = useState(false);
  ////////////
  // const [messages, setMessages] = useState([
  //   <MessageChat messageTxt="fin jiti " IsMyMessage={true} />,
  // ]);
  const [messages, setMessages] = useState(["fin ghadi bia"]);
  const addChatClick = () => {
    setMessages([...messages, "fin mchiti"]);
  };
  //////////////
  const chatRef = useChatScroll(messages);

  return (
    // <div className={styles.chatContainer}>
    <div className={styles.chatContainer}>
      <button
        onClick={addChatClick}
        style={{ position: "absolute", top: "200px", zIndex: "5" }}
      >
        add chat test
      </button>

      <div
        className={`${styles.chatHeader} ${styles.shrinkHeader} ${
          showDetails && styles.displayNoneDesktop
        }`}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.arrowChat}>
            <ArrowLeft />
          </div>
          <PicUsername src="./baif.jpg" primaryText="Brahim Baif" />
        </div>

        <div>
          <ChatDetailsIcon
            className={styles.detailsIcon}
            onClick={() => {
              setShowDetails(true);
            }}
          />
        </div>
      </div>

      <div
        ref={chatRef}
        className={`${styles.chat} ${showDetails && styles.displayNoneDesktop}`}
      >
        <MessageChat key={22343252} messageTxt="aji 3endi" IsMyMessage={true} />
        <MessageChat
          key={22343253}
          contactImgSrc="./baif.jpg"
          messageTxt="okay safi 7ta nchof"
          IsMyMessage={false}
        />
        <MessageChat
          key={22343254}
          messageTxt="la bla matchof"
          IsMyMessage={true}
        />
        <MessageChat
          key={22343255}
          contactImgSrc="./baif.jpg"
          messageTxt="shaloom"
          IsMyMessage={false}
        />
        <MessageChat key={22343256} messageTxt="wassaup" IsMyMessage={true} />
        <MessageChat
          key={22343257}
          messageTxt="fin mchiti"
          IsMyMessage={true}
        />
        <MessageChat
          key={22343258}
          messageTxt="fin mchiti"
          IsMyMessage={true}
        />
        <MessageChat
          key={22343259}
          messageTxt="fin mchiti"
          IsMyMessage={true}
        />
        <MessageChat
          key={223432511}
          messageTxt="fin jiti "
          IsMyMessage={true}
        />
        <MessageChat
          key={223432512}
          messageTxt="why are you ignoring me ?"
          IsMyMessage={true}
        />
        <MessageChat
          key={2234325123}
          messageTxt="7ta t5rej"
          IsMyMessage={true}
        />
        <MessageChat
          key={223432514}
          messageTxt="mabiti tji 3andi"
          IsMyMessage={true}
        />
        {messages.map((message, i) => (
          <MessageChat
            key={i}
            messageTxt={message}
            IsMyMessage={i % 2 === 0}
            contactImgSrc="./baif.jpg"
          />
        ))}
      </div>
      <div
        className={`${styles.textAreaContainer} ${
          showDetails && styles.displayNoneDesktop
        }`}
      >
        <TextArea isCommentInput={false} />
      </div>

      <Details setShowDetails={setShowDetails} showDetails={showDetails} />
    </div>
  );
};
