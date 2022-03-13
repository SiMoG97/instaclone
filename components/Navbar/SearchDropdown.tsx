import ProfilePic from "../ProfilePic";
import styles from "./Navbar.module.scss";
import CrossIcon from "../../public/cross.svg";

const SearchDropdown = ({ isFocus }: { isFocus: boolean }) => {
  return (
    <div className={`${styles.searchDropdown} ${isFocus && styles.open}`}>
      <div className={styles.recentContainer}>
        <div className={styles.recent}>
          <div>Recent</div>
          <button className="primary-btn">Clear All</button>
        </div>
        <div>
          <SearchCard />
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;

const SearchCard = () => {
  return (
    <div className={styles.userSearch}>
      <ProfilePic
        src="https://i.imgur.com/W2UbjS8.jpg"
        width={50}
        height={50}
        className={styles.imgContainer}
      />
      <div className={styles.searchUserCard}>
        <div>
          <div className={styles.userName}>ziisnik</div>
          <div className={styles.userFullName}>
            Bader | بدر {true && "• Following"}
          </div>
        </div>
        <div>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};
