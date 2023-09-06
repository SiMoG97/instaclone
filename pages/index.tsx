import type { NextPage } from "next";

import PostsMain from "../components/Post/PostsMain";
import styles from "../styles/home.module.scss";
import { useEffect, useRef } from "react";
import Suggestions from "../components/Suggestions";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/Login");
  //   }
  // }, [session, router]);
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
Home.requireAuth = true;

export default Home;
