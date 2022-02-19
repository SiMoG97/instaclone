import type { NextPage } from "next";
// import { useRouter } from "next/router";
import DropDown from "../components/Navbar/Dropdown";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // const router = useRouter();
  const isLoggedin = false;
  if (!isLoggedin) {
    // router.push("/login");
  }
  return (
    <div
      className={styles.container}
      style={{ height: "100vh", width: "100%" }}
    >
      <h1>home</h1>

      {/* dev */}
      {/* <DropDown /> */}
    </div>
  );
};

export default Home;
