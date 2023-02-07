import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "../../../FormComponents/Textarea";
import PicUsername from "../../../PicUsername";
import styles from "../../popup.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputForm from "../../../FormComponents/InputForm";
import LocationIcon from "../../../../public/location.svg";
import ArrowIcon from "../../../../public/arrowBottom.svg";
import { FilesToUploadT } from "..";
import SwitchButton from "../../../FormComponents/SwitchButton";

const schema = z.object({
  postDescription: z.string().max(2000),
  location: z.string().max(20).optional(),
  imgAlt: z
    .object({
      id: z.string(),
      alt: z.string().max(150),
      src: z.string(),
    })
    .array(),
  hideLike: z.boolean(),
  commentsOff: z.boolean(),
});
export type FormType = z.infer<typeof schema>;

type ShareSideBarProps = {
  filesToUp: FilesToUploadT;
};
export function ShareSideBar({ filesToUp }: ShareSideBarProps) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const firstRenderRef = useRef(true);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "imgAlt",
      control,
    }
  );
  const { ref, ...rest } = register("postDescription");
  function EmojiClickCallBack(emojiObj: any) {
    setFocus("postDescription");
    setValue("postDescription", getValues("postDescription") + emojiObj);
  }
  useEffect(() => {
    for (let i = 0; i < filesToUp.length; i++) {
      remove(i);
      append(
        { id: filesToUp[i].id, alt: "", src: filesToUp[i].src },
        { shouldFocus: false }
      );
    }
    return () => {
      for (let i = 0; i < filesToUp.length; i++) {
        remove(i);
      }
    };
  }, [filesToUp.length]);
  // console.log(errors);
  return (
    <div className={styles.shareSideBar}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("submited");
          console.log(data);
          // setData(JSON.stringify(data));
        })}
        autoComplete="off"
      >
        <PicUsername
          size="size-4-5"
          src="/baif.jpg"
          primaryText="thebrahimbaif"
          style={{ padding: "0 1.6rem" }}
        />
        <div className={styles.borderTopBottom}>
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
        </div>
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
        <ShowHideContaienr header="Accessibility">
          <div className={styles.smallText}>
            Alt text describes your photos for people with visual impairments.
            Alt text will be automatically created for your photos or you can
            choose to write your own.
          </div>
          {fields.map((field, i) => {
            return (
              <div key={field.id} className={`${styles.altImgInputContainer}`}>
                <div
                  className={styles.smallImgPreview}
                  style={{ backgroundImage: `url(${field.src})` }}
                ></div>
                <InputForm
                  {...register(`imgAlt.${i}.alt` as const)}
                  style={{ padding: ".6rem 1.2rem" }}
                  size="large"
                  placeholder="Write alt text..."
                  placeholderSize="placeHSM"
                />
              </div>
            );
          })}
        </ShowHideContaienr>
        <ShowHideContaienr header="Advanced settings">
          <div>
            <div className={styles.checkBoxContainer}>
              <div>Hide like and view counts on this post</div>
              <div>
                <SwitchButton
                  {...register("hideLike")}
                  variation="large"
                  id="hideLike"
                />
              </div>
            </div>
            <div className={styles.smallText}>
              Only you will see the total number of likes and views on this
              post. You can change this later by going to the ··· menu at the
              top of the post. To hide like counts on other people's posts, go
              to your account settings. Learn more
            </div>
          </div>
          <div>
            <div className={styles.checkBoxContainer}>
              <div>Turn off commenting</div>
              <div>
                <SwitchButton
                  {...register("commentsOff")}
                  variation="large"
                  id="commentsOff"
                />
              </div>
            </div>
            <div className={styles.smallText}>
              You can change this later by going to the ··· menu at the top of
              your post.
            </div>
          </div>
        </ShowHideContaienr>

        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
}

function ShowHideContaienr({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  const [show, setShow] = useState(false);
  function toggleShow() {
    setShow((prev) => !prev);
  }
  return (
    <div className={`${styles.borderTopBottom} ${show ? styles["show"] : ""}`}>
      <div onClick={toggleShow} className={styles.headerContainer}>
        <div style={show ? { fontWeight: "500" } : {}}>{header}</div>
        <div>
          <ArrowIcon
            style={{ transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}` }}
          />
        </div>
      </div>
      <div
        style={
          show
            ? { display: "block", paddingBottom: "1.6rem" }
            : { display: "none" }
        }
      >
        {children}
      </div>
    </div>
  );
}
