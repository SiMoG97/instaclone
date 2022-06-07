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
import Textarea from "../components/Textarea";
import PopupContainer from "../components/Popups/PopupContainer";

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
        <Suggestions
          postsContainer={postsContainer}
          myUserName="simo_echaarani"
          myFullName="Simo Echaarani"
        />
        {/* dev */}
        {/* <DropDown /> */}
        {/* <div className={styles.suggestions} ref={suggesEl}>
          <Footer />
        </div> */}
      </div>
      {/* <div className="devEnv"></div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          zIndex: "70000000",
          width: "800px",
        }}
      >
        <Textarea isCommentInput={false} />
      </div> */}
      <PopupContainer />
    </>
  );
};

export default Home;
