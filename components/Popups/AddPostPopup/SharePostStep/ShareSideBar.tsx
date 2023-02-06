import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../FormComponents/Textarea";
import PicUsername from "../../../PicUsername";
import styles from "../../popup.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputForm from "../../../FormComponents/InputForm";
import LocationIcon from "../../../../public/location.svg";

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
          containerCss={{ margin: "2rem 0 .5rem" }}
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
          ref={(e) => {
            ref(e);
            taRef.current = e;
          }}
        />
        <div
          className={`${styles.borderTopBottom} ${styles.locationInputContainer}`}
        >
          <InputForm
            style={{ paddingLeft: "1.6rem", lineHeight: "0" }}
            {...register("location")}
            border={false}
            size="large"
            placeholder="Add location"
            placeholderSize="placeHLG"
          />
          <LocationIcon className={styles.locationIcon} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
