import { useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import SearchIcon from "../../public/search.svg";
import HiddenLayer from "../HiddenLayer";

const SearchInput = () => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className={`${styles.search} ${focus && styles.zindex}`}>
        <div
          className={`${styles.fakeInput} ${focus && styles.hideFakeInput} `}
          onClick={() => {
            setFocus(true);
            inputRef.current?.focus();
          }}
        >
          <SearchIcon />
          Search
        </div>
        <input type="text" placeholder="Search" ref={inputRef} />
        <div
          className={styles.closeSearch}
          onClick={() => {
            setFocus(false);
            console.log(inputRef.current);
          }}
        >
          {/* span is the closing x in search bar  */}
          <span></span>
        </div>
      </div>
      {/* {focus && <HiddenLayer isShowing={focus} setFocus={setFocus} />} */}
      {focus && <HiddenLayer clicked={setFocus} />}
    </>
  );
};

export default SearchInput;
