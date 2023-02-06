import { useEffect, useRef } from "react";
import styles from "./textarea.module.scss";
import Heart from "../../public/heart.svg";
import PicUpload from "../../public/picUpload.svg";
import { SendButton } from "./SendButton";
import { CustomEmojiPicker } from "../FormComponents/CustomEmojiPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

type TextAreaProps = {
  isCommentInput: boolean;
  inputFocus?: boolean;
  setInputFocus?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedReplyUser?: string;
};
const schema = z.object({
  inputText: z.string().max(1000),
});
type InputType = z.infer<typeof schema>;

const TextareaInput = ({
  isCommentInput,
  inputFocus,
  setInputFocus,
  selectedReplyUser,
}: TextAreaProps) => {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isValid },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });
  const { ref, ...registerRest } = register("inputText");

  // Reply to some comment handler
  useEffect(() => {
    if (!selectedReplyUser || selectedReplyUser.length === 0) return;
    setValue("inputText", selectedReplyUser);
    setFocus("inputText");
  }, [selectedReplyUser]);

  // Focus input if inputFocus is true
  useEffect(() => {
    if (!inputFocus) return;
    setFocus("inputText");
  }, [inputFocus]);

  const isInputEmpty = (watch("inputText") || "").length === 0;
  useEffect(() => {
    if (!taRef.current) return;
    calculateTAHeight(taRef.current);
  }, [watch("inputText")]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div
        className={`${styles.textareaContainer} ${
          !isCommentInput && styles.border
        }`}
      >
        <CustomEmojiPicker
          callBack={(emojiObj: string) => {
            if (!taRef.current) return;
            setFocus("inputText");
            setValue("inputText", getValues("inputText") + emojiObj);
            calculateTAHeight(taRef.current);
          }}
        />
        <div className={styles.textareaParent}>
          <textarea
            ref={(e) => {
              taRef.current = e;
              ref(e);
            }}
            {...registerRest}
            onFocus={() => {
              if (!setInputFocus) return;
              setInputFocus(true);
            }}
            onBlur={() => {
              if (!setInputFocus) return;
              setInputFocus(false);
            }}
            placeholder={isCommentInput ? "Add a comment..." : "Message..."}
          ></textarea>
          {/* <input type="submit" /> */}
        </div>
        <div className={styles.lastSection}>
          {isCommentInput ? (
            <SendButton focus={!isInputEmpty}>Post</SendButton>
          ) : (
            <>
              {isInputEmpty ? (
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

function calculateTAHeight(elm: HTMLTextAreaElement) {
  if (elm.scrollHeight > 84) {
    elm.style.overflowY = "scroll";
    return;
  }
  if (elm.scrollHeight !== 36) {
    elm.style.height = "auto";
  }
  elm.style.height = `${elm.scrollHeight}px`;
  elm.style.overflowY = "hidden";
  if (elm.scrollHeight > 36 && elm.scrollHeight < 52) {
    elm.style.height = `36px`;
  }
}
