import { createContext, ReactNode, useEffect, useState } from "react";
import useThemeToggler from "../Hooks/useThemeToggler";
type props = {
  children: ReactNode;
};
type ContextType = {
  toggle: () => void;
  theme: string;
};

export const ThemeContext = createContext<ContextType | null>(null);

const ThemeContextProvider = ({ children }: props) => {
  const { theme, toggle } = useThemeToggler();
  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
