import type { NextPage } from "next";

// import { useRouter } from "next/router";
import DropDown from "../components/Navbar/Dropdown";
import PostsMain from "../components/Post/PostsMain";
import styles from "../styles/home.module.scss";
import { RefObject, useRef } from "react";
import ProfilePic from "../components/ProfilePic";
import CommentInput from "../components/Post/CommentInput";
import Footer from "../components/Footer";
import Suggestions from "../components/Suggestions";
import Textarea from "../components/Textarea";
import PopupContainer from "../components/Popups/PopupContainer";
import PicUsername from "../components/PicUsername";
import Checkbox from "../components/FormComponents/SwitchButton";
import LikesPopup from "../components/Popups/LikesPopup";
import SharePostPopup from "../components/Popups/SharePostPopup";

const Home: NextPage = () => {
  const postsContainer = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className={`container ${styles.main}`}>
        <div className="posts" ref={postsContainer}>
          <PostsMain />
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
      {/* 
      <div
        style={{
          position: "absolute",
          top: "100px",
          zIndex: "70000000",
          width: "800px",
        }}
      ></div>
      <div className="devEnv">
      </div>
        <PicUsername
          src="./pp.jpg"
          size="size-3"
          primaryText="Simo_echaarani"
          secondaryText="Simo Echaarani"
        />
       */}
      {/* <Textarea isCommentInput={false} /> */}
      {/* <span>test</span> */}
      {/* <LikesPopup /> */}
      <SharePostPopup />
      {/* <PopupContainer popupHeader="Likes"></PopupContainer> */}
    </>
  );
};

export default Home;
