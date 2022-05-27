import type { NextPage } from "next";
import { useLayoutEffect, useRef } from "react";
// import { useRouter } from "next/router";
import DropDown from "../components/Navbar/Dropdown";
import PostMain from "../components/Post/PostMain";
import styles from "../styles/home.module.scss";
import type { RefObject } from "react";
import ProfilePic from "../components/ProfilePic";

const Home: NextPage = () => {
  const suggesEl = useRef<HTMLDivElement | null>(null);
  const postsContainer = useRef<HTMLDivElement | null>(null);

  const calculatingSuggestPos = () => {
    const SuggestPosLeft =
      postsContainer.current!.offsetLeft + postsContainer.current!.offsetWidth;
    suggesEl.current!.style.left = `${SuggestPosLeft + 30}px`;
  };
  useLayoutEffect(() => {
    calculatingSuggestPos();
  }, []);
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      calculatingSuggestPos();
    });
  });

  return (
    <div className={`container ${styles.main}`}>
      <div className="posts" ref={postsContainer}>
        <PostMain />
        <PostMain />
        <PostMain />
        <PostMain />
        <PostMain />
        <PostMain />
      </div>
      <div className={styles.suggestions} ref={suggesEl}></div>

      {/* dev */}
      {/* <DropDown /> */}
    </div>
  );
};

export default Home;
