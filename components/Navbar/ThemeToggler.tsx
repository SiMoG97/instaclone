import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    !localStorage.getItem("theme") &&
      localStorage.setItem("theme", storedTheme);
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className={styles.toggler}>
      <button onClick={toggle}>toggle theme</button>
    </div>
  );
};

export default ThemeToggler;
