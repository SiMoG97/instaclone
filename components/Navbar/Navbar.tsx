import Search from "./Search";
import styles from "./Navbar.module.scss";
import Logo from "../../public/logoText.svg";
import HomeIcon from "../../public/home.svg";
import SendIcon from "../../public/send.svg";
import SendActive from "../../public/sendActive.svg";
import HeartIcon from "../../public/heart.svg";
import AddPost from "../../public/addPost.svg";
import AddPostActive from "../../public/addPostActive.svg";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useState } from "react";
import HiddenLayer from "../HiddenLayer";
import ProfilePic from "../ProfilePic";
import BookmarkIcon from "../../public/bookmark.svg";
import SettingsIcon from "../../public/settings.svg";
import PhoneNav from "./PhoneNav";
import { useRouter } from "next/router";

const Navbar = () => {
  //testing
  const [addPostRest, setAddPostTest] = useState(false);
  const [activeHeart, setActiveHeart] = useState(false);

  //testing
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className={styles.nav}>
        <div className={`container ${styles.container}`}>
          <div className={styles.child}>
            <Link href="/">
              <a>
                <Logo className={styles.logo} />
              </a>
            </Link>
          </div>
          <div className={styles.child}>
            <Search />
          </div>
          <div className={styles.child}>
            <Link href="/">
              <a>
                <HomeIcon
                  className={router.pathname === "/" ? styles.activeIcons : ""}
                />
              </a>
            </Link>
            {addPostRest ? (
              <AddPostActive
                className={`${styles.activeIcons} ${styles.strokeNon}`}
                onClick={() => {
                  setAddPostTest(false);
                }}
              />
            ) : (
              <AddPost
                onClick={() => {
                  setAddPostTest(true);
                }}
              />
            )}
            <Link href="/DirectInbox">
              <a>
                {router.pathname === "/DirectInbox" ? (
                  <SendActive className={styles.activeIcons} />
                ) : (
                  <SendIcon />
                )}
                {/* <SendIcon
                // className={
                //   router.pathname === "/DirectInbox" && styles.activeIcons
                // }
                /> */}
              </a>
            </Link>

            <HeartIcon
              onClick={() => {
                setActiveHeart(!activeHeart);
              }}
              className={activeHeart ? styles.activeIcons : ""}
            />
            <div className={styles.profilePicContainer}>
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <ProfilePic
                  size="size-5"
                  src="https://i.imgur.com/W2UbjS8.jpg"
                  animate={false}
                  hasStory={false}
                  seen={false}
                />
              </div>
              <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
          <TopRightNav />
        </div>
        {isOpen && <HiddenLayer clicked={setIsOpen} />}
      </nav>
      <PhoneNav />
    </>
  );
};

const TopRightNav = () => {
  return (
    <div className={styles.tabletNavTopRight}>
      <SendIcon />
      <BookmarkIcon width="24" height="24" />
      <SettingsIcon width="24" height="24" />
    </div>
  );
};

export default Navbar;
