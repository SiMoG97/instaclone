import Footer from "../components/Footer";
import ProfileComponent from "../components/Profile";
import ImagesSection from "../components/Profile/ImagesSection";
import ProfileHeader from "../components/Profile/ProfileHeader";

const ProfilePage = () => {
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

export default ProfilePage;
