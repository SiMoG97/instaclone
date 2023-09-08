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
import { useRouter } from "next/router";

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

function MyApp({ Component, pageProps, ...appProps }: AppPropsWithAuth) {
  const { pathname } = useRouter();
  const isLoginSignUp =
    pathname == "/Login" || pathname == "/Signup" ? true : false;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <ThemeContextProvider>
        {/* <SessionProvider session={pageProps.session}>
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
        </SessionProvider> */}
        <SessionProvider session={pageProps.session}>
          <>
            {pageProps.session && !isLoginSignUp ? <Navbar /> : null}
            <Component {...pageProps} />
          </>
        </SessionProvider>
      </ThemeContextProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
