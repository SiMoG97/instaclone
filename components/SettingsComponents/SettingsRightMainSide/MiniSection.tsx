import styles from "../settings.module.scss";

type MinisectionProps = {
  bigHeading?: string;
  smallHeading?: string;
  description?: string;
  border?: boolean;
  children: React.ReactNode;
};
export function MiniSection({
  bigHeading,
  smallHeading,
  description,
  border = true,
  children,
}: MinisectionProps) {
  return (
    <div
      className={`${styles.minisectionProps} ${!border ? styles.noBorder : ""}`}
    >
      {bigHeading ? (
        <div className={styles.bigHeading}>{bigHeading}</div>
      ) : null}
      {smallHeading ? (
        <div className={styles.smallHeading}>{smallHeading}</div>
      ) : null}
      {children}
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
    </div>
  );
}
