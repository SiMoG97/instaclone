import Button from "../Button";
import PopupContainer, { SetIsOpenType } from "./PopupContainer";
import styles from "./popup.module.scss";
import PicUsername from "../PicUsername";
import SearchIcon from "../../public/search.svg";
import PopupBody from "./PopupBody";

const SharePostPopup = () => {
  return (
    <PopupContainer>
      {(setIsOpen: SetIsOpenType) => (
        <PopupBody popupHeader="Share" setIsOpen={setIsOpen}>
          <div className={styles.ShareContainer}>
            <div className={styles.writeSomething}>
              <div className={styles.minimizedPostPicContainer}>
                <img src="./mediaTesting/img1.jpg" alt="somthing" />
              </div>
              <textarea
                name="writeSomething"
                placeholder="Write a message..."
              />
            </div>
            <Search />
            <div className={styles.friendListToSend}>
              {Array.from(Array(20).keys()).map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <PicUsername
                      src="/baif.jpg"
                      primaryText="thebrahimbaif"
                      secondaryText="Brahim Baif"
                    />
                    <Button>send</Button>
                  </div>
                );
              })}
            </div>
            <Button
              size={3}
              style={{
                padding: "1.5rem",
                width: "100%",
              }}
            >
              Done
            </Button>
          </div>
        </PopupBody>
      )}
    </PopupContainer>
  );
};

const Search = () => {
  return (
    <form>
      <div className={styles.search}>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>
    </form>
  );
};

export default SharePostPopup;
