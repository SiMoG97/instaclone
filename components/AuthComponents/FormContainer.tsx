import Link from "next/link";
import Logo from "../../public/logoText.svg";
import styles from "./form.module.scss";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "../Footer";
export const FormContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className={styles.Container} style={{ marginTop: "10rem" }}>
      <div className={styles.formContainer}>
        {/* {router.pathname === "/Login" ? (
          <Logo style={{ marginBottom: "3rem" }} />
        ) : (
          <Logo />
        )}

        {router.pathname === "/Signup" && (
          <div className={styles.textUnderLogo}>
            Sign up to see photos and videos from your friends.
          </div>
        )} */}
        {children}
      </div>
      {/* --------------------------------------------------------------------*/}
      <div
        style={{
          marginTop: "1rem",
          padding: "2rem",
        }}
        className={styles.formContainer}
      >
        {router.pathname === "/Login"
          ? "Don't have an account ?"
          : "Have an account ?"}

        <Link href={router.pathname === "/Login" ? "/Signup" : "/Login"}>
          <a style={{ color: "var(--helper-primary)" }}>
            {router.pathname === "/Login" ? " Sign up" : " Log in"}
          </a>
        </Link>
      </div>
      <Footer centered />
    </div>
  );
};
