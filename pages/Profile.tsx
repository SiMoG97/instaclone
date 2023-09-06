import { useEffect } from "react";
import Footer from "../components/Footer";
import ProfileComponent from "../components/Profile";
import ImagesSection from "../components/Profile/ImagesSection";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session?.user, status);
  }, [session, status]);
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

export default ProfilePage;
