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
import AddPostPopup from "../Popups/AddPostPopup";
import Button from "../Button";

const Navbar = () => {
  const isLoggedIn = true;
  //testing
  const [activeHeart, setActiveHeart] = useState(false);

  //testing
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [addPostIsOpen, setAddPostIsOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={`container ${styles.navContainer}`}>
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
          {isLoggedIn ? (
            <>
              <div className={styles.child}>
                <Link href="/">
                  <a>
                    <HomeIcon
                      className={
                        router.pathname === "/" && !addPostIsOpen
                          ? styles.activeIcons
                          : ""
                      }
                    />
                  </a>
                </Link>

                {addPostIsOpen ? (
                  <>
                    <AddPostActive
                      className={`${styles.activeIcons} ${styles.strokeNon}`}
                    />
                  </>
                ) : (
                  <AddPost
                    onClick={() => {
                      setAddPostIsOpen(true);
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
                      src="/pp.jpg"
                      animate={false}
                      hasStory={false}
                      seen={false}
                    />
                  </div>
                  <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
              </div>
              <TopRightNav pathname={router.pathname} />
            </>
          ) : (
            <div
              className={styles.child}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link href="/Login">
                <a>
                  <Button size={1} bold>
                    Login
                  </Button>
                </a>
              </Link>
              <Link href="/Signup">
                <a>
                  <Button bold mainShape={false} mainColor={false} size={1}>
                    Sign Up
                  </Button>
                </a>
              </Link>
            </div>
          )}
        </div>
        {isOpen && <HiddenLayer clicked={setIsOpen} />}
      </nav>
      {addPostIsOpen ? (
        <AddPostPopup isOpen={addPostIsOpen} setIsOpen={setAddPostIsOpen} />
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <PhoneNav
          addPostIsOpen={addPostIsOpen}
          setAddPostIsOpen={setAddPostIsOpen}
        />
      ) : null}
    </>
  );
};

type TopRightNavType = {
  pathname: string;
};
const TopRightNav = ({ pathname }: TopRightNavType) => {
  return (
    <div className={styles.tabletNavTopRight}>
      <Link href="/DirectInbox">
        <a>
          {pathname === "/DirectInbox" ? (
            <SendActive className={styles.activeIcons} />
          ) : (
            <SendIcon />
          )}
        </a>
      </Link>
      <BookmarkIcon width="24" height="24" />
      <Link href="/Settings">
        <a>
          <SettingsIcon width="24" height="24" />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
