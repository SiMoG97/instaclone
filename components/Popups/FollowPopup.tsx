import PopupBody from "./PopupBody";
import PopupContainer, { SetIsOpenType } from "./PopupContainer";
import styles from "./popup.module.scss";
import { useState } from "react";
import PicUsername from "../PicUsername";
import Button from "../Button";

const FollowPopup = () => {
  const [isFollowersActive, setIsFollowersActive] = useState<boolean>();
  return (
    <PopupContainer>
      {(setIsOpen: SetIsOpenType) => (
        <PopupBody popupHeader="Followers - Following" setIsOpen={setIsOpen}>
          <div className={styles.followPopup}>
            <div className={styles.switch}>
              <div
                className={`${isFollowersActive && styles.active} `}
                onClick={() => {
                  setIsFollowersActive(true);
                }}
              >
                Followers
              </div>
              <div
                className={`${!isFollowersActive && styles.active} `}
                onClick={() => {
                  setIsFollowersActive(false);
                }}
              >
                Following
              </div>
            </div>
            {/* <div style={{ overflowY: "scroll", padding: "1rem" }}> */}
            <>
              {isFollowersActive ? (
                <div style={{ overflowY: "scroll", padding: "1rem" }}>
                  {Array.from(Array(25).keys()).map((_, i) => (
                    <FollowerCard
                      imgSrc="./baif.jpg"
                      key={i}
                      isPrimary={i % 3 === 0 ? true : false}
                      buttonText={i % 3 === 0 ? "Follow" : "Following"}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ overflowY: "scroll", padding: "1rem" }}>
                  {Array.from(Array(25).keys()).map((_, i) => (
                    <FollowerCard
                      imgSrc="./baif.jpg"
                      key={i}
                      isPrimary={false}
                      buttonText="Remove"
                    />
                  ))}
                </div>
              )}
            </>
          </div>
        </PopupBody>
      )}
    </PopupContainer>
  );
};

const FollowerCard = ({
  isPrimary,
  buttonText,
  imgSrc,
}: {
  isPrimary: boolean;
  buttonText: string;
  imgSrc: string;
}) => {
  return (
    <div className={styles.followerCard}>
      <PicUsername
        src={imgSrc}
        primaryText="brahin_baif"
        secondaryText="Brahim baif"
      />
      <Button mainColor={isPrimary}>{buttonText}</Button>
    </div>
  );
};

export default FollowPopup;
