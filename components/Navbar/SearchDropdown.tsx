import styles from "./Navbar.module.scss";

const SearchDropdown = ({ isFocus }: { isFocus: boolean }) => {
  return (
    <div className={`${styles.searchDropdown} ${isFocus && styles.open}`}>
      <div className={styles.recentContainer}>
        <div className={styles.recent}>
          <div>Recent</div>
          <button className="primary-btn">Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
