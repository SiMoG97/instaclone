import styles from "./Navbar.module.scss";
import ProfileIcon from "../../public/profile.svg";
import BookmarkIcon from "../../public/bookmark.svg";
import SettingsIcon from "../../public/settings.svg";
import Link from "next/link";
import SwitchButton from "../FormComponents/SwitchButton";
import { useThemeContext } from "../../context/themeContext";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
type DropdownType = {
  isOpen: boolean;
  setIsOpen(appear: boolean): void;
};
const Dropdown = ({ isOpen, setIsOpen }: DropdownType) => {
  const { theme, toggle } = useThemeContext();
  const firstRenderRef = useRef(true);
  const { data: session, status } = useSession();

  const { register, watch, setValue, getValues } = useForm<{
    isDark: boolean;
  }>();
  const isDark = watch("isDark");
  useEffect(() => {
    toggle(getValues("isDark"));
  }, [isDark]);

  useEffect(() => {
    if (!theme || !firstRenderRef.current) return;
    setValue("isDark", theme === "dark" ? true : false);
    firstRenderRef.current = false;
  }, [theme]);
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
        <li>
          <div className={styles.darkThemeToggler}>
            <div style={{ padding: "1rem" }}>
              Dark theme : {theme === "dark" ? "on" : "off"}
            </div>
            <SwitchButton id="themeToggler" {...register("isDark")} />
          </div>
        </li>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Link href="/api/auth/signout">
            <a
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Log out
            </a>
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
