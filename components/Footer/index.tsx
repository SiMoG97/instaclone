import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = ({ centered }: { centered?: boolean }) => {
  const date = new Date();
  console.log(centered);
  return (
    <footer className={`${styles.footer} ${centered ? styles.centered : ""}`}>
      <div>
        <ul>
          <li>
            <Link href="/">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Help</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>API</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>press</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Jobs</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Terms</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Locations</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Top Accounts</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Hashtags</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Language</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>© {date.getFullYear()} INSTACLONE FROM SIMO</div>
    </footer>
  );
};

export default Footer;
