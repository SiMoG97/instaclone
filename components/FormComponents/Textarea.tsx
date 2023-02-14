import { CSSProperties, forwardRef, useState } from "react";
import { CustomEmojiPicker } from "./CustomEmojiPicker";
import styles from "./style.module.scss";

type TextreaProps = {
  id?: string;
  resizable?: boolean;
  emojis?: boolean;
  fixedHeight?: boolean;
  border?: boolean;
  placeholder?: string;
  TextareaCss?: CSSProperties;
  containerCss?: CSSProperties;
  BottomStyle?: CSSProperties;
  // taRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  numberOfChars: string;
  callBack?: (...args: any[]) => any;
  maxNumChars: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextreaProps>(
  (
    {
      id = "",
      TextareaCss = {},
      containerCss = {},
      BottomStyle = {},
      border = false,
      children,
      emojis = false,
      fixedHeight = false,
      placeholder,
      resizable = false,
      // taRef,
      numberOfChars,
      callBack,
      maxNumChars,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className={styles.textareaContainer} style={containerCss}>
        <div>
          <textarea
            id={id}
            style={TextareaCss}
            ref={ref}
            onChange={() => {
              console.log(numberOfChars);
            }}
            placeholder={placeholder ? placeholder : ""}
            className={`${!resizable ? styles.notResize : ""}
            ${!border ? styles.noBorder : ""}
            ${fixedHeight ? styles.fixedHeight : ""}`}
            {...restProps}
          ></textarea>
        </div>
        <div className={styles.taBottomPart} style={BottomStyle}>
          {emojis ? (
            <CustomEmojiPicker
              EmojiPickerCss={{
                position: "absolute",
                top: "42rem",
                left: "1.2rem",
                transform: "scale(.8)",
              }}
              callBack={callBack}
            />
          ) : null}
          <div className={`${styles.charCounter} ${styles.dangers}`}>
            {numberOfChars}/{maxNumChars}
          </div>
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
