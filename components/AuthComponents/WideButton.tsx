import GoogleIcon from "../../public/google.svg";
import styles from "./form.module.scss";

export const WideButton = ({
  children,
  hasIcon,
  disabled = false,
  type = "submit",
}: {
  children: string;
  hasIcon: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}) => {
  return (
    <button className={`${styles.wideButton} ${disabled && styles.disabled}`}>
      {hasIcon && <GoogleIcon />}
      {children}
    </button>
  );
};
