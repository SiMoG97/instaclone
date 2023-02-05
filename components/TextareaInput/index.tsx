import { useEffect, useRef, useState } from "react";
import styles from "./textarea.module.scss";
import Heart from "../../public/heart.svg";
import PicUpload from "../../public/picUpload.svg";
import { SendButton } from "./SendButton";
import { CustomEmojiPicker } from "../FormComponents/CustomEmojiPicker";

type TextAreaProps = {
  isCommentInput: boolean;
  inputFocus?: boolean;
  setInputFocus?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedReplyUser?: string;
};

const TextareaInput = ({
  isCommentInput,
  inputFocus,
  setInputFocus,
  selectedReplyUser,
}: TextAreaProps) => {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [isTaEmpty, setIsTaEmpty] = useState(true);

  const replyToHandler = () => {
    if (taRef.current && selectedReplyUser && setInputFocus) {
      taRef.current.value = selectedReplyUser;
      setInputFocus(true);
      setIsTaEmpty(false);
    }
  };
  useEffect(() => {
    if (selectedReplyUser && selectedReplyUser.length > 0) {
      replyToHandler();
    }
  }, [selectedReplyUser, replyToHandler]);

  useEffect(() => {
    if (inputFocus && taRef.current) {
      taRef.current.focus();
    }
  }, [inputFocus]);

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
        <CustomEmojiPicker
          taRef={taRef}
          setIsTaEmpty={setIsTaEmpty}
          callBack={() => {
            if (!taRef.current) return;
            calculateTaHeight(taRef.current);
          }}
        />
        <div className={styles.textareaParent}>
          <textarea
            ref={taRef}
            onChange={taChangeHandler}
            onFocus={() => {
              if (setInputFocus) {
                setInputFocus(true);
              }
            }}
            onBlur={() => {
              if (setInputFocus) {
                setInputFocus(false);
              }
            }}
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

export default TextareaInput;
