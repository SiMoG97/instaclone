import Search from "./Search";
import styles from "./Navbar.module.scss";
import Logo from "../../public/logoText.svg";
import HomeIcon from "../../public/home.svg";
import SendIcon from "../../public/send.svg";
import HeartIcon from "../../public/heart.svg";
import AddPost from "../../public/addPost.svg";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useState } from "react";
import HiddenLayer from "../HiddenLayer";
import ProfilePic from "../ProfilePic";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <HomeIcon />
            <AddPost />
            <SendIcon />
            <AddPost />
            <HeartIcon />
            <AddPost />

            <ThemeToggler />
            <div
              className={styles.profilePicContainer}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* <div className={styles.profilePic}>
                <Image
                  src="https://i.imgur.com/W2UbjS8.jpg"
                  width={50}
                  height={50}
                />
              </div> */}
              <ProfilePic
                size="size-5"
                src="https://i.imgur.com/W2UbjS8.jpg"
                animate={false}
                hasStory={false}
                seen={false}
              />
              <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
        {isOpen && <HiddenLayer clicked={setIsOpen} />}
      </nav>
    </>
  );
};

export default Navbar;
