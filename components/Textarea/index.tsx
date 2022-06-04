import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./textarea.module.scss";
import FaceEmoji from "../../public/FaceEmoji.svg";
import Heart from "../../public/heart.svg";
import PicUpload from "../../public/picUpload.svg";
import { SendButton } from "./SendButton";

const EmojiPicker = dynamic(() => import("../EmojiPicker"), { ssr: false });

type props = {
  isCommentInput: boolean;
};

const TextArea = ({ isCommentInput }: props) => {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiToggler = useRef<SVGAElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTaEmpty, setIsTaEmpty] = useState(true);

  const emojiCloser = (e: any) => {
    if (emojiRef.current !== null && emojiRef.current !== undefined) {
      if (e.target === emojiToggler.current) return;
      if (
        e.target !== emojiRef.current.children[0]?.children[0] &&
        showEmojiPicker
      ) {
        setShowEmojiPicker(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", emojiCloser);
    return () => {
      window.removeEventListener("click", emojiCloser);
    };
  }, [showEmojiPicker]);

  const taChangeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
      scrollHeight: number;
      style: React.CSSProperties;
    };
    calculateTaHeight(target);
    if (target.value === "") {
      setIsTaEmpty(true);
      return;
    }
    setIsTaEmpty(false);
  };

  const calculateTaHeight = (elm: calculateTaHeightTypes) => {
    if (elm!.scrollHeight > 84) {
      elm!.style.overflowY = "scroll";
    } else {
      if (elm!.scrollHeight !== 36) {
        elm!.style.height = "auto";
      }
      elm!.style.height = `${elm!.scrollHeight}px`;
      elm!.style.overflowY = "hidden";
      if (elm!.scrollHeight > 36 && elm!.scrollHeight < 52) {
        elm!.style.height = `36px`;
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
          <FaceEmoji
            className={styles.emojiPickerFace}
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
            }}
          />
          {showEmojiPicker && (
            <div ref={emojiRef}>
              <EmojiPicker
                onEmojiSelect={(emojiObj: any) => {
                  taRef.current?.focus();
                  taRef.current!.value += emojiObj.native;
                  calculateTaHeight(taRef.current);
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.textareaParent}>
          <textarea
            ref={taRef}
            onChange={(e) => {
              taChangeHandler(e);
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
type calculateTaHeightTypes =
  | HTMLTextAreaElement
  | (EventTarget & {
      value: string;
      scrollHeight: number;
      style: React.CSSProperties;
    })
  | null
  | {
      value: string;
      scrollHeight: number;
      style: React.CSSProperties;
    };

export default TextArea;
