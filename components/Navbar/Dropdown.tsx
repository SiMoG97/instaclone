import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import ProfileIcon from "../../public/profile.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import SettingsIcon from "../../public/settings.svg";
import Link from "next/link";
import SwitchButton from "../FormComponents/SwitchButton";
import { ThemeContext } from "../../context/themeContext";

type DropdownType = {
  isOpen: boolean;
  setIsOpen(appear: boolean): void;
};
const Dropdown = ({ isOpen, setIsOpen }: DropdownType) => {
  const themeContext = useContext(ThemeContext);
  const themeToggleHandler = () => {
    if (themeContext) {
      themeContext.toggle();
    }
  };
  return (
    <>
      <ul
        className={`${styles.dropDown} ${
          // !isOpen ? styles.close : styles.zindex
          !isOpen ? styles.close : "zindex1000"
        }`}
      >
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link href="/simo">
            <a>
              <ProfileIcon />
              <span>Profile</span>
            </a>
          </Link>
        </li>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link href="/">
            <a>
              <BookmarkIcon />
              <span>Saved</span>
            </a>
          </Link>
        </li>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link href="/">
            <a>
              <SettingsIcon />
              <span>Settings</span>
            </a>
          </Link>
        </li>
        <li
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              themeToggleHandler();
            }
          }}
        >
          <div className={styles.darkThemeToggler}>
            <div
              onClick={() => {
                // toggle();
                themeToggleHandler();
                console.log("clicked");
              }}
            >
              Dark theme :
              {themeContext && themeContext.theme === "dark" ? "on" : "off"}
            </div>
            <SwitchButton
              isChecked={themeContext !== null && themeContext.theme === "dark"}
              clickHandler={themeToggleHandler}
            />
          </div>
        </li>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link href="/">
            <a>Log out</a>
          </Link>
        </li>
      </ul>
      {/* {!isClose && <HiddenLayer clicked={setIsClose} />} */}
    </>
  );
};

export default Dropdown;

// const DropRow = () => {
//   return (
//     <li>
//       <SettingsIcon />
//     </li>
//   );
// };
