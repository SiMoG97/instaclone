import Button from "../Button";
import PopupContainer from "./PopupContainer";
import styles from "./popup.module.scss";
import PicUsername from "../PicUsername";
const SharePostPopup = () => {
  return (
    <PopupContainer popupHeader="Share">
      <div className={styles.ShareContainer}>
        <div className={styles.friendListToSend}>
          {
            // [...Array(10).keys()]
            Array.from(Array(20).keys()).map((item, i) => {
              return (
                <div
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
            })
          }
        </div>
        <Button
          size={3}
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            padding: "1.5rem",
          }}
        >
          Done
        </Button>
      </div>
    </PopupContainer>
  );
};

export default SharePostPopup;
