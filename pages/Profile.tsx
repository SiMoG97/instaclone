import { useEffect } from "react";
import Footer from "../components/Footer";
import ProfileComponent from "../components/Profile";
import ImagesSection from "../components/Profile/ImagesSection";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { getSession, useSession } from "next-auth/react";
import { requireAuth } from "../utils/requireAuth";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   console.log(session?.user, status);
  // }, [session, status]);
  return (
    <div
      className="container profile "
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <ProfileComponent />
    </div>
  );
};

ProfilePage.requireAuth = true;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return requireAuth(ctx, ({ session }: { session: Session }) => {
    return {
      props: { session },
    };
  });
}

export default ProfilePage;
