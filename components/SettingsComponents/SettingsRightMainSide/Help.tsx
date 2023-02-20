import ArrowR from "../../../public/arrowRight.svg";
import styles from "../settings.module.scss";

export function Help() {
  return (
    <div className={styles.HelpContainer}>
      <h2>Help</h2>
      <div>
        {content.map((item) => (
          <div key={item} className={styles.helpCard}>
            <div className={styles.helpText}>{item}</div>
            <div className={styles.helpArrowContainer}>
              <ArrowR />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const content = [
  "Help Center",
  "Privacy and Security Help",
  "Support Requests",
  "Apps and Websites",
];
