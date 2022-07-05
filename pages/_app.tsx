import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import ThemeContextProvider from "../context/themeContext";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const { pathname } = appProps.router;
  let showNav = true;
  if (pathname === "/Signup" || pathname === "/Login") {
    showNav = false;
  }
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <ThemeContextProvider>
        {showNav && <Navbar />}
        <Component {...pageProps} />
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
