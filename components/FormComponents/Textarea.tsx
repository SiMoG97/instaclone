import { CSSProperties, forwardRef, useState } from "react";
import { CustomEmojiPicker } from "./CustomEmojiPicker";
import styles from "./style.module.scss";

type TextreaProps = {
  resizable?: boolean;
  emojis?: boolean;
  fixedHeight?: boolean;
  border?: boolean;
  placeholder?: string;
  TextareaCss?: CSSProperties;
  taRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  numberOfChars: string;
  callBack?: (...args: any[]) => any;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextreaProps>(
  (
    {
      TextareaCss = {},
      border = false,
      children,
      emojis = false,
      fixedHeight = false,
      placeholder,
      resizable = false,
      taRef,
      numberOfChars,
      callBack,
      ...restProps
    },
    ref
  ) => {
    // const [_, setIsTaEmpty] = useState(true);
    return (
      <div className={styles.textareaContainer}>
        <div>
          <textarea
            style={TextareaCss}
            ref={ref}
            onChange={() => {
              console.log("changed");
            }}
            placeholder={placeholder ? placeholder : ""}
            className={`${!resizable ? styles.notResize : ""}
            ${!border ? styles.noBorder : ""}
            ${fixedHeight ? styles.fixedHeight : ""}`}
            {...restProps}
          ></textarea>
        </div>
        <div className={styles.taBottomPart}>
          {emojis ? (
            <CustomEmojiPicker
              // taRef={taRef}
              // setIsTaEmpty={setIsTaEmpty}
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
            {numberOfChars}/2,200
          </div>
        </div>
      </div>
    );
  }
);
