import ImagesSection from "../components/Profile/ImagesSection";
import ProfileHeader from "../components/Profile/ProfileHeader";

const Profile = () => {
  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <ProfileHeader username="Toto Hamza" />
      <ImagesSection />
    </div>
  );
};

export default Profile;
