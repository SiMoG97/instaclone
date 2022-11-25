import styles from "./profile.module.scss";
import SavedIcon from "../../public/profileIcons/savedIcon.svg";

const SavedTab = () => {
  return <>{false ? <h1>saved posts</h1> : <SavedTabPlaceholder />}</>;
};
const SavedTabPlaceholder = () => {
  return (
    <div className={styles.tabsContentContainer}>
      <div
        style={{
          textAlign: "left",
          fontSize: "1.3rem",
          color: "var(--txt-c-2)",
          marginBottom: "2rem",
        }}
      >
        Only you can see what you've saved
      </div>
      <div className={styles.circle}>
        <SavedIcon width="38" height="38" viewBox="0 0 24 24" />
      </div>
      <div className={styles.bigText}>Save</div>
      <p>
        Save photos and videos that you want to see again. No one is notified,
        and only you can see what you've saved.
      </p>
    </div>
  );
};

export default SavedTab;
