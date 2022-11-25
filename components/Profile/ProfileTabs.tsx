import styles from "./profile.module.scss";
import PostsIcon from "../../public/profileIcons/postsIcon.svg";
import PostsSmall from "../../public/profileIcons/postsSmall.svg";
import ReelsIcon from "../../public/profileIcons/reelsIcon.svg";
import ReelsSmall from "../../public/profileIcons/reelsSmall.svg";
import SavedIcon from "../../public/profileIcons/savedIcon.svg";
import SavedSmall from "../../public/profileIcons/savedSmall.svg";
import TaggedIcon from "../../public/profileIcons/taggedIcon.svg";
import TaggedSmall from "../../public/profileIcons/taggedSmall.svg";
import VideoIcon from "../../public/profileIcons/videoIcon.svg";
import VideoSmall from "../../public/profileIcons/videoSmall.svg";
import { TabsNames } from ".";

type ProfileTabsProps = {
  tabName: TabsNames;
  setTabName: React.Dispatch<React.SetStateAction<TabsNames>>;
};

const ProfileTabs = ({ tabName, setTabName }: ProfileTabsProps) => {
  const isMyProfile = true;
  return (
    <div className={styles.tabsContainer}>
      <Tab
        tabName={tabName}
        BigIcon={<PostsIcon />}
        SmallIcon={<PostsSmall />}
        label="posts"
        onClick={() => {
          setTabName("posts");
        }}
      />
      {true ? (
        <Tab
          tabName={tabName}
          BigIcon={<ReelsIcon />}
          SmallIcon={<ReelsSmall />}
          label="reels"
          onClick={() => {
            setTabName("reels");
          }}
        />
      ) : null}
      {isMyProfile ? (
        <Tab
          tabName={tabName}
          BigIcon={<SavedIcon />}
          SmallIcon={<SavedSmall />}
          label="saved"
          onClick={() => {
            setTabName("saved");
          }}
        />
      ) : null}
      <Tab
        tabName={tabName}
        BigIcon={<TaggedIcon />}
        SmallIcon={<TaggedSmall />}
        label="tagged"
        onClick={() => {
          setTabName("tagged");
        }}
      />
      {true ? (
        <Tab
          tabName={tabName}
          BigIcon={<VideoIcon />}
          SmallIcon={<VideoSmall />}
          label="videos"
          onClick={() => {
            setTabName("videos");
          }}
        />
      ) : null}
    </div>
  );
};

type TabProps = {
  SmallIcon: any;
  BigIcon: any;
  label: string;

  onClick: () => void;
  tabName: TabsNames;
};

const Tab = ({ BigIcon, SmallIcon, label, onClick, tabName }: TabProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.tab} ${label === tabName ? styles.active : ""}`}
    >
      <div className={styles.bigIconContainer}>{BigIcon}</div>
      <div className={styles.smallIconContainer}>
        {SmallIcon}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default ProfileTabs;
