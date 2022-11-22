import { useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import SearchIcon from "../../public/search.svg";
import HiddenLayer from "../HiddenLayer";
import SearchDropdown from "./SearchDropdown";

const SearchInput = () => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className={`${styles.search} ${focus && "zindex1000"}`}>
        <div
          className={`${styles.fakeInput} ${focus && styles.hideFakeInput} `}
          onClick={() => {
            setFocus(true);
            if (inputRef.current) {
              inputRef.current.focus();
            }
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
        <SearchDropdown isFocus={focus} />
      </div>
      {/* {focus && <HiddenLayer isShowing={focus} setFocus={setFocus} />} */}
      {focus && <HiddenLayer clicked={setFocus} />}
    </>
  );
};

export default SearchInput;
