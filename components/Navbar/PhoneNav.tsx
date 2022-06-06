import styles from "./Navbar.module.scss";
import HomeIcon from "../../public/home.svg";
import HeartIcon from "../../public/heart.svg";
import AddPost from "../../public/addPost.svg";
import SearchIcon from "../../public/search.svg";
import ProfilePic from "../ProfilePic";
const PhoneNav = () => {
  return (
    <div className={styles.phoneNav}>
      <HomeIcon />
      <SearchIcon width="24px" height="24px" />
      <AddPost />
      <HeartIcon />
      <ProfilePic
        src="./pp.jpg"
        hasStory={false}
        animate={false}
        seen={false}
        size="size-4"
      />
    </div>
  );
};

export default PhoneNav;
