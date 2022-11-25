import styles from "./profile.module.scss";
import TaggedIcon from "../../public/profileIcons/taggedIcon.svg";

const TaggedTab = () => {
  return (
    <>
      {false ? <h1>here is your taggged posts</h1> : <TaggedTabPlaceholder />}
    </>
  );
};

const TaggedTabPlaceholder = () => {
  return (
    <div className={styles.tabsContentContainer}>
      <div className={styles.circle}>
        <TaggedIcon width="38" height="38" viewBox="0 0 24 24" />
      </div>
      <div className={styles.bigText}>Photos of you</div>
      <p>{"When people tag you in photos, they'll appear here."}</p>
    </div>
  );
};

export default TaggedTab;
