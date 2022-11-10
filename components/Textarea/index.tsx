import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./textarea.module.scss";
import FaceEmoji from "../../public/faceEmoji.svg";
import Heart from "../../public/heart.svg";
import PicUpload from "../../public/picUpload.svg";
import { SendButton } from "./SendButton";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

const EmojiPicker = dynamic(() => import("../EmojiPicker"), { ssr: false });

type props = {
  isCommentInput: boolean;
};

const TextArea = ({ isCommentInput }: props) => {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiIconOpenButton = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTaEmpty, setIsTaEmpty] = useState(true);

  useOnClickOutside(
    emojiRef,
    () => setShowEmojiPicker(false),
    emojiIconOpenButton
  );

  const taChangeHandler = ({
    target,
  }: {
    target: EventTarget & HTMLTextAreaElement;
  }) => {
    calculateTaHeight(target);
    if (target.value === "") {
      setIsTaEmpty(true);
      return;
    }
    setIsTaEmpty(false);
  };

  const calculateTaHeight = (elm: HTMLTextAreaElement) => {
    if (elm.scrollHeight > 84) {
      elm.style.overflowY = "scroll";
    } else {
      if (elm.scrollHeight !== 36) {
        elm.style.height = "auto";
      }
      elm.style.height = `${elm.scrollHeight}px`;
      elm.style.overflowY = "hidden";
      if (elm.scrollHeight > 36 && elm.scrollHeight < 52) {
        elm.style.height = `36px`;
      }
    }
  };
  return (
    <form>
      <div
        className={`${styles.textareaContainer} ${
          !isCommentInput && styles.border
        }`}
      >
        <div>
          <div style={{ display: "contents" }} ref={emojiIconOpenButton}>
            <FaceEmoji
              onClick={() => {
                setShowEmojiPicker((prev) => !prev);
              }}
            />
          </div>
          {showEmojiPicker && (
            <div ref={emojiRef}>
              <EmojiPicker
                onEmojiSelect={(emojiObj: any) => {
                  if (taRef.current) {
                    taRef.current.focus();
                    if (taRef.current.value === "") {
                      setIsTaEmpty(false);
                    }
                    taRef.current.value += emojiObj.native;
                    calculateTaHeight(taRef.current);
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.textareaParent}>
          <textarea
            ref={taRef}
            onChange={taChangeHandler}
            placeholder={isCommentInput ? "Add a comment..." : "Message..."}
          ></textarea>
        </div>
        <div className={styles.lastSection}>
          {isCommentInput ? (
            <SendButton focus={!isTaEmpty}>Post</SendButton>
          ) : (
            <>
              {isTaEmpty ? (
                <div style={{ width: "9rem" }}>
                  <PicUpload />
                  <Heart />
                </div>
              ) : (
                <SendButton focus={true}>Send</SendButton>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default TextArea;
