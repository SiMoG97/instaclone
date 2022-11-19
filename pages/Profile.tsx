import Footer from "../components/Footer";
import ImagesSection from "../components/Profile/ImagesSection";
import ProfileHeader from "../components/Profile/ProfileHeader";

const Profile = () => {
  return (
    <div
      className="container profile "
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div>
        <ProfileHeader username="Toto Hamza" />
        <ImagesSection />
      </div>
      <Footer centered={true} />
    </div>
  );
};

export default Profile;
