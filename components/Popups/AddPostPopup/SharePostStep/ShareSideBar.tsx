import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../FormComponents/Textarea";
import PicUsername from "../../../PicUsername";
import styles from "../../popup.module.scss";

export function ShareSideBar() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <div className={styles.shareSideBar}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setData(JSON.stringify(data));
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
          register={register}
        />
        <input type="submit" />
      </form>
      {/* <div>

        </div> */}
    </div>
  );
}
