import styles from "./Navbar.module.scss";
import HomeIcon from "../../public/home.svg";
import HeartIcon from "../../public/heart.svg";
import AddPost from "../../public/addPost.svg";
import SearchIcon from "../../public/search.svg";
import ProfilePic from "../ProfilePic";
import Link from "next/link";
import { useRouter } from "next/router";
import AddPostActive from "../../public/addPostActive.svg";

type PhoneNavType = {
  addPostIsOpen: boolean;
  setAddPostIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const PhoneNav = ({ addPostIsOpen, setAddPostIsOpen }: PhoneNavType) => {
  const router = useRouter();

  return (
    <div className={styles.phoneNav}>
      <Link href={"/"}>
        <a>
          <HomeIcon
            className={
              router.pathname === "/" && !addPostIsOpen
                ? styles.activeIcons
                : ""
            }
          />
        </a>
      </Link>
      <SearchIcon width="24px" height="24px" />
      {addPostIsOpen ? (
        <>
          <AddPostActive
            className={`${styles.activeIcons} ${styles.strokeNon}`}
          />
        </>
      ) : (
        <AddPost
          onClick={() => {
            setAddPostIsOpen(true);
          }}
        />
      )}
      {/* <AddPostPopup /> */}
      <HeartIcon />
      <Link href={"/Profile"}>
        <a>
          <ProfilePic
            src="/pp.jpg"
            hasStory={false}
            animate={false}
            seen={false}
            size="size-4"
          />
        </a>
      </Link>
    </div>
  );
};

export default PhoneNav;
