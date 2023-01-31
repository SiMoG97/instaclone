import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import ImagesSection from "./ImagesSection";
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";
import ReelsTab from "./ReelsTab";
import SavedTab from "./SavedTab";
import TaggedTab from "./TaggedTab";
import VideosTab from "./VideosTab";
import { useRouter } from "next/router";
import PrivateProfile from "./PrivateProfile";

export type TabsNames = "posts" | "tagged" | "saved" | "videos" | "reels";

const ProfileComponent = () => {
  const [tabName, setTabName] = useState<TabsNames>("posts");
  const router = useRouter();
  const isPrivateAccount = false;
  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.tab) return;
    if (Array.isArray(router.query.tab)) {
      router.push("/Profile");
      setTabName("posts");
      return;
    }
    if (
      !["posts", "tagged", "saved", "videos", "reels"].includes(
        router.query.tab
      )
    ) {
      router.push("/Profile");
      setTabName("posts");
      return;
    }

    if (router.query.tab === "") {
      setTabName("posts");
      return;
    }
    setTabName(router.query.tab as TabsNames);
  }, [router.isReady]);

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
        {isPrivateAccount ? (
          <PrivateProfile />
        ) : (
          <>
            <ProfileTabs tabName={tabName} setTabName={setTabName} />
            {showTab()}
          </>
        )}
      </div>
      <Footer centered={true} />
    </>
  );
};

export default ProfileComponent;
