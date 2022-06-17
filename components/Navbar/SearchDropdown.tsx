import styles from "./Navbar.module.scss";
import CrossIcon from "../../public/cross.svg";
import PicUsername from "../PicUsername";

type propsType = {
  isFocus: boolean;
};

const SearchDropdown = ({ isFocus }: propsType) => {
  return (
    <div className={`${styles.searchDropdown} ${isFocus && styles.open}`}>
      <div className={styles.recentContainer}>
        <div className={styles.recent}>
          <div>Recent</div>
          <button className="primary-btn">Clear All</button>
        </div>
        <div>
          <SearchCard />
          <SearchCard />
          <SearchCard />
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
      {/* <ProfilePic
        src="https://i.imgur.com/W2UbjS8.jpg"
        animate={false}
        size="size-3"
        hasStory={true}
        seen={false}
      />
      <div className={styles.searchUserCard}>
        <div>
          <div className={styles.userName}>hafid_smail</div>
          <div className={styles.userFullName}>
            Bader | بدر {true && "• Following"}
          </div>
        </div>
        <div>
          <CrossIcon />
        </div>
      </div> */}
      <div className={styles.searchUserCard}>
        <PicUsername
          src="https://i.imgur.com/W2UbjS8.jpg"
          size="size-3"
          primaryText="hafid_smail"
          secondaryText={`Bader | بدر ${true && "• Following"}`}
          hasStory={true}
        />
        <div>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};
