import { useContext } from "react";
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
  const { toggle, theme } = useContext(ThemeContext);

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
          <Link href="/Profile">
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
          <Link href="/Settings">
            <a>
              <SettingsIcon />
              <span>Settings</span>
            </a>
          </Link>
        </li>
        <li
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              toggle();
            }
          }}
        >
          <div className={styles.darkThemeToggler}>
            <div onClick={toggle}>
              Dark theme : {theme === "dark" ? "on" : "off"}
            </div>
            <SwitchButton isChecked={theme === "dark"} clickHandler={toggle} />
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
