import { createContext, ReactNode, useContext } from "react";
import useThemeToggler from "../Hooks/useThemeToggler";
type props = {
  children: ReactNode;
};
type ContextType = {
  toggle: (isDark: boolean) => void;
  theme: string;
};

const ThemeContext = createContext<ContextType>({} as ContextType);

const ThemeContextProvider = ({ children }: props) => {
  const { theme, toggle } = useThemeToggler();
  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextProvider;
