import { useLayoutEffect, useRef, useState } from "react";
import styles from "./textarea.module.scss";
type props = {
  isCommentInput: boolean;
};

const TextArea = ({ isCommentInput }: props) => {
  const isTextareaEmpty = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
      scrollHeight: number;
      style: React.CSSProperties;
    };

    if (target.scrollHeight > 84) {
      target.style.overflowY = "scroll";
    } else {
      if (target.scrollHeight !== 36) {
        target.style.height = "auto";
      }
      target.style.height = `${target.scrollHeight}px`;
      target.style.overflowY = "hidden";
      if (target.scrollHeight > 36 && target.scrollHeight < 52) {
        target.style.height = `36px`;
      }
    }
  };

  return (
    <form>
      <div className={styles.textareaContainer}>
        <div></div>
        <div className={styles.textareaParent}>
          <textarea
            onChange={isTextareaEmpty}
            placeholder={isCommentInput ? "Add a comment..." : "Message..."}
          ></textarea>
        </div>
        <div></div>
      </div>
    </form>
  );
};

export default TextArea;
