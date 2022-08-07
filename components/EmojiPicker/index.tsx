import { useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import styles from "./emojiPicker.module.scss";

function EmojiPicker(props: any) {
  const ref = useRef(null);
  useEffect(() => {
    const theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    new Picker({ ...props, data, ref, theme });
  }, [ref]);
  return <div ref={ref} className={styles.emojiContainer} />;
}

export default EmojiPicker;
