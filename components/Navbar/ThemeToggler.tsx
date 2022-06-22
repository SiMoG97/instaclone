import useThemeToggler from "../Hooks/useThemeToggler";
import styles from "./Navbar.module.scss";

const ThemeToggler = () => {
  const { toggle } = useThemeToggler();
  return (
    <div className={styles.toggler}>
      <button onClick={toggle}>toggle theme</button>
    </div>
  );
};

export default ThemeToggler;
