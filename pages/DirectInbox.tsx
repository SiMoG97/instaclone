import React from "react";
import { Contacts, Chat } from "../components/Dm";
import styles from "../styles/directInbox.module.scss";
import { requireAuth } from "../utils/requireAuth";
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";

const DirectInbox = () => {
  return (
    <div className={`container ${styles.dmContainer}`}>
      <div className={styles.dmInnerContainer}>
        <Contacts />
        <Chat />
      </div>
    </div>
  );
};

DirectInbox.requireAuth = true;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return requireAuth(ctx, ({ session }: { session: Session }) => {
    return {
      props: { session },
    };
  });
}
export default DirectInbox;
