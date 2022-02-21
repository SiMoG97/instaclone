import type { NextPage } from "next";
// import { useRouter } from "next/router";
import DropDown from "../components/Navbar/Dropdown";

const Home: NextPage = () => {
  // const router = useRouter();
  const isLoggedin = false;
  if (!isLoggedin) {
    // router.push("/login");
  }
  return (
    <div className="container main">
      <h1>home</h1>

      {/* dev */}
      {/* <DropDown /> */}
    </div>
  );
};

export default Home;
