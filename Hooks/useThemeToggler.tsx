import { useEffect, useState } from "react";

type ThemeType = "dark" | "light";

const useThemeToggler = () => {
  const [theme, setTheme] = useState<ThemeType>("" as ThemeType);
  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme !== "dark" && storedTheme !== "light") {
      storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    setTheme(storedTheme as ThemeType);
    !localStorage.getItem("theme") &&
      localStorage.setItem("theme", storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = (isDark: boolean) => {
    isDark ? setTheme("dark") : setTheme("light");
  };

  return { toggle, theme };
};

export default useThemeToggler;
