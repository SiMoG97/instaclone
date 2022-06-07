import { useEffect, useState } from "react";
import styles from "./PopupContainer.module.scss";

const PopupContainer = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const body = window.document.body;
    if (isOpen) {
      console.log(window.pageYOffset);
      console.log(body.scrollTop);
      const scroll = window.pageYOffset;
      console.log(scroll);
      body.classList.add("noscroll");
      window.scrollTo(0, scroll);
      console.log(body.scrollHeight);
      return;
    }
    body.classList.remove("noscroll");
    //////////////
    //////////////

    // if (isOpen) {
    //   window.document.body.style.overflowY = "hidden";
    // } else {
    //   window.document.body.style.overflowY = "scroll";
    // }
    // window.addEventListener("scroll", () => {
    //   console.log(window.pageYOffset);
    // });
    const preventScroll = () => {
      console.log("test");
      window.scrollTo(0, 0);
    };
    // if (isOpen) {
    //   window.addEventListener("scroll", preventScroll);
    // } else {
    //   window.removeEventListener("scroll", preventScroll);
    // }
    // return () => {
    //   window.removeEventListener("scroll", preventScroll);
    // };
  }, [isOpen]);

  if (isOpen)
    return (
      <div
        className={styles.container}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
    );
  return <></>;
};

export default PopupContainer;
