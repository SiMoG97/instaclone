import type { NextPage } from "next";

import PostsMain from "../components/Post/PostsMain";
import styles from "../styles/home.module.scss";
import { useRef } from "react";
import Suggestions from "../components/Suggestions";
import Head from "next/head";

const Home: NextPage = () => {
  const postsContainer = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Head>
        <title>Instaclone</title>
      </Head>
      <div className={`container ${styles.main}`}>
        <div className="posts" ref={postsContainer}>
          <PostsMain />
        </div>
        <Suggestions
          postsContainer={postsContainer}
          myUserName="simo_echaarani"
          myFullName="Simo Echaarani"
        />
      </div>
    </>
  );
};

export default Home;
