import GoogleIcon from "../../public/google.svg";
import styles from "./form.module.scss";

export const WideButton = ({
  children,
  hasIcon,
  disabled = false,
  type = "submit",
  size = "sm",
  onClick,
}: {
  children: string;
  hasIcon: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  size?: "sm" | "lg";
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles[size]} ${styles.wideButton} ${
        disabled && styles.disabled
      }`}
      onClick={onClick}
    >
      {hasIcon && <GoogleIcon />}
      {children}
    </button>
  );
};
