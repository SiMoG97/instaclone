import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../FormComponents/Textarea";
import PicUsername from "../../../PicUsername";
import styles from "../../popup.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  postDescription: z.string().max(2000),
  location: z.string().max(20).optional(),
  imagesAlts: z.string().max(150).array().optional(),
  hideLike: z.boolean().optional(),
  commentsOff: z.boolean().optional(),
});

export type FormType = z.infer<typeof schema>;

export function ShareSideBar() {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { ref, ...rest } = register("postDescription");
  // console.log(setValue("postDescription",''));
  function EmojiClickCallBack(emojiObj: any) {
    setFocus("postDescription");
    setValue("postDescription", getValues("postDescription") + emojiObj);
  }
  return (
    <div className={styles.shareSideBar}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("submited");
          console.log(data);
          // setData(JSON.stringify(data));
        })}
      >
        <PicUsername
          size="size-4-5"
          src="/baif.jpg"
          primaryText="godskiller404"
          style={{ padding: "0 1.6rem" }}
        />
        <Textarea
          placeholder="Write a caption..."
          fixedHeight
          TextareaCss={{ padding: ".3rem 1.6rem" }}
          emojis
          taRef={taRef}
          callBack={EmojiClickCallBack}
          numberOfChars={new Intl.NumberFormat().format(
            (watch("postDescription") || "").length
          )}
          {...rest}
          // onChange
          ref={(e) => {
            ref(e);
            taRef.current = e;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
