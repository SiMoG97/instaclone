import type { NextPage } from "next";
// import { useRouter } from "next/router";
import DropDown from "../components/Navbar/Dropdown";
import PostMain from "../components/Post/PostMain";
import styles from "../styles/home.module.scss";
import { RefObject, useRef } from "react";
import ProfilePic from "../components/ProfilePic";
import CommentInput from "../components/Post/CommentInput";
import Footer from "../components/Footer";
import Suggestions from "../components/Suggestions";

const Home: NextPage = () => {
  const postsContainer = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className={`container ${styles.main}`}>
        <div className="posts" ref={postsContainer}>
          <PostMain />
          <PostMain />
          <PostMain />
          <PostMain />
          <PostMain />
          <PostMain />
        </div>
        <Suggestions postsContainer={postsContainer} />
        {/* dev */}
        {/* <DropDown /> */}
        {/* <div className={styles.suggestions} ref={suggesEl}>
          <Footer />
        </div> */}
      </div>
    </>
  );
};

export default Home;
