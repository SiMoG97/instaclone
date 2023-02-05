import { CSSProperties, forwardRef, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { CustomEmojiPicker } from "./CustomEmojiPicker";
import styles from "./style.module.scss";
type TextreaProps = {
  resizable?: boolean;
  emojis?: boolean;
  fixedHeight?: boolean;
  border?: boolean;
  placeholder?: string;
  TextareaCss?: CSSProperties;
  register: UseFormRegister<FieldValues>;
};

export function Textarea({
  register,
  TextareaCss,
  border,
  emojis,
  fixedHeight,
  placeholder,
  resizable,
}: TextreaProps) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [_, setIsTaEmpty] = useState(true);
  const { ref, ...rest } = register("postDescription");
  return (
    <div className={styles.textareaContainer}>
      <div>
        <textarea
          style={TextareaCss}
          ref={(e) => {
            ref(e);
            taRef.current = e;
          }}
          {...rest}
          placeholder={placeholder ? placeholder : ""}
          className={`${!resizable ? styles.notResize : ""}
           ${!border ? styles.noBorder : ""}
            ${fixedHeight ? styles.fixedHeight : ""}`}
        ></textarea>
      </div>
      <div className={styles.taBottomPart}>
        {emojis ? (
          <CustomEmojiPicker
            taRef={taRef}
            setIsTaEmpty={setIsTaEmpty}
            EmojiPickerCss={{
              position: "absolute",
              top: "42rem",
              left: "1.2rem",
              transform: "scale(.8)",
            }}
          />
        ) : null}
        <div className={`${styles.charCounter} ${styles.dangers}`}>0/2,200</div>
      </div>
    </div>
  );
}
