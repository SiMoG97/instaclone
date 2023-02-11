import styles from "../settings.module.scss";

type MinisectionProps = {
  bigHeading?: string;
  smallHeading?: string;
  description?: string;
  children: React.ReactNode;
};
export function MiniSection({
  bigHeading,
  smallHeading,
  description,
  children,
}: MinisectionProps) {
  return (
    <div className={styles.minisectionProps}>
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
