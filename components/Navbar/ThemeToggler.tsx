import useThemeToggler from "../../Hooks/useThemeToggler";
import styles from "./Navbar.module.scss";
import ThemeContextProvider, { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

const ThemeToggler = () => {
  const { toggle } = useContext(ThemeContext);
  return (
    <div className={styles.toggler}>
      {console.log()}
      <button
        onClick={() => {
          toggle();
        }}
      >
        toggle theme
      </button>
    </div>
  );
};

export default ThemeToggler;
