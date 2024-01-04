import type { GetServerSidePropsContext, NextPage } from "next";

import PostsMain from "../components/Post/PostsMain";
import styles from "../styles/home.module.scss";
import { useEffect, useRef } from "react";
import Suggestions from "../components/Suggestions";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { requireAuth } from "../utils/requireAuth";
import { Session } from "next-auth";

const Home = () => {
  // console.log(first)
  // console.log("hello");
  const { data: session, status } = useSession();
  console.log();
  const router = useRouter();
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    }
  }, [session, router, status]);

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
          myUserName={session?.user?.name?.replace(" ", "_") || ""}
          myFullName={session?.user?.name || ""}
          picSrc={session?.user?.image || "/avatarPlaceholder.jpg"}
        />
      </div>
    </>
  );
};
Home.requireAuth = true;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return requireAuth(ctx, ({ session }: { session: Session }) => {
    console.log(session);
    return {
      props: { session },
    };
  });
}

export default Home;
