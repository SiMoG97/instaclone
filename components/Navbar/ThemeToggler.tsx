import useThemeToggler from "../../Hooks/useThemeToggler";
import styles from "./Navbar.module.scss";
import ThemeContextProvider, { ThemeContext } from "../../context/themeContext";
import { useContext } from "react";

const ThemeToggler = () => {
  const themeContext = useContext(ThemeContext);
  const clickHandler = () => {
    if (themeContext) {
      themeContext.toggle();
    }
  };
  return (
    <div className={styles.toggler}>
      {console.log()}
      <button
        onClick={() => {
          clickHandler();
        }}
      >
        toggle theme
      </button>
    </div>
  );
};

export default ThemeToggler;
