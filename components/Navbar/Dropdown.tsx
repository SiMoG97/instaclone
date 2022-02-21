import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import ProfileIcon from "../../public/profile.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import SettingsIcon from "../../public/settings.svg";
import Link from "next/link";
import HiddenLayer from "../HiddenLayer";

type DropdownType = {
  isOpen: boolean;
  setIsOpen(appear: boolean): void;
};
const Dropdown = ({ isOpen, setIsOpen }: DropdownType) => {
  return (
    <>
      <ul
        className={`${styles.dropDown} ${
          // !isOpen ? styles.close : styles.zindex
          !isOpen ? styles.close : "zindex1000"
        }`}
      >
        <li>
          <Link href="/simo">
            <a>
              <ProfileIcon />
              <span>Profile</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <BookmarkIcon />
              <span>Saved</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <SettingsIcon />
              <span>Settings</span>
            </a>
          </Link>
        </li>
        <li>
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
