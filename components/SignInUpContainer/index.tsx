import Link from "next/link";
import Logo from "../../public/logoText.svg";
import GoogleIcon from "../../public/google.svg";
import styles from "./form.module.scss";
import Input from "./Input";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "../Footer";
const SignInUpContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className={styles.Container}>
      <div className={styles.formContainer}>
        <Logo />
        {router.pathname === "/Signup" && (
          <div className={styles.textUnderLogo}>
            Sign up to see photos and videos from your friends.
          </div>
        )}
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

export const WideButton = ({
  children,
  hasIcon,
  disabled = false,
}: {
  children: string;
  hasIcon: boolean;
  disabled?: boolean;
}) => {
  return (
    <button className={`${styles.wideButton} ${disabled && styles.disabled}`}>
      {hasIcon && <GoogleIcon />}
      {children}
    </button>
  );
};
export const OrLine = () => {
  return (
    <div className={styles.orLine}>
      <div>OR</div>
    </div>
  );
};

export default SignInUpContainer;
