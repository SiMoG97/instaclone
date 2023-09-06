import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import ThemeContextProvider from "../context/themeContext";
import GradientCicle from "./../public/gradientCircle.svg";
import { trpc } from "../utils/trpc";
import Providers from "../context/Providers";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ProtectedLayout } from "../components/layouts/protectedLayouts";

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

function MyApp({ Component, pageProps, ...appProps }: AppPropsWithAuth) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <ThemeContextProvider>
        <SessionProvider session={pageProps.session}>
          {Component.requireAuth ? (
            <>
              <ProtectedLayout>
                <>
                  <Navbar />
                  <Component {...pageProps} />
                </>
              </ProtectedLayout>
            </>
          ) : (
            <>
              <Component {...pageProps} />
            </>
          )}
        </SessionProvider>
      </ThemeContextProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
