import { CSSProperties, useRef, useState } from "react";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import FaceEmoji from "../../public/faceEmoji.svg";
import dynamic from "next/dynamic";
import styles from "./style.module.scss";
const EmojiPicker = dynamic(() => import("../EmojiPicker"), { ssr: false });

type CustomEmojiPickerProps = {
  taRef: React.RefObject<HTMLTextAreaElement>;
  setIsTaEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  callBack?: (...args: any[]) => any;
  EmojiPickerCss?: CSSProperties;
  emojiIconColor?: string;
};

export function CustomEmojiPicker({
  taRef,
  callBack,
  setIsTaEmpty,
  EmojiPickerCss = {},
  emojiIconColor,
}: CustomEmojiPickerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiIconOpenButton = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    emojiRef,
    () => setShowEmojiPicker(false),
    emojiIconOpenButton
  );
  return (
    <div>
      <div
        style={{ display: "contents", cursor: "pointer" }}
        ref={emojiIconOpenButton}
      >
        <FaceEmoji
          className={styles.FaceEmoji}
          onClick={() => {
            setShowEmojiPicker((prev) => !prev);
          }}
        />
      </div>
      {showEmojiPicker ? (
        <div ref={emojiRef} style={EmojiPickerCss}>
          <EmojiPicker
            onEmojiSelect={(emojiObj: any) => {
              if (taRef.current) {
                taRef.current.focus();
                if (taRef.current.value === "") {
                  setIsTaEmpty(false);
                }
                taRef.current.value += emojiObj.native;
                if (!callBack) return;
                callBack();
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
