import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Html, Head } from "next/document";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
