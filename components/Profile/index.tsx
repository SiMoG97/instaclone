import React, { useState } from "react";
import Footer from "../Footer";
import ImagesSection from "./ImagesSection";
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";
import ReelsTab from "./ReelsTab";
import SavedTab from "./SavedTab";
import TaggedTab from "./TaggedTab";
import VideosTab from "./VideosTab";

export type TabsNames = "posts" | "tagged" | "saved" | "videos" | "reels";

const ProfileComponent = () => {
  const [tabName, setTabName] = useState<TabsNames>("posts");
  const showTab = () => {
    if (tabName === "posts") {
      return <ImagesSection />;
    } else if (tabName === "tagged") {
      return <TaggedTab />;
    } else if (tabName === "saved") {
      return <SavedTab />;
    } else if (tabName === "reels") {
      return <ReelsTab />;
    } else if (tabName === "videos") {
      return <VideosTab />;
    }
  };
  return (
    <>
      <div>
        <ProfileHeader username="Toto Hamza" />
        <ProfileTabs tabName={tabName} setTabName={setTabName} />
        {showTab()}
      </div>
      <Footer centered={true} />
    </>
  );
};

export default ProfileComponent;
