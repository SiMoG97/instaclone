import PopupContainer, { SetIsOpenType } from "./PopupContainer";
import styles from "./popup.module.scss";
import PicUsername from "../PicUsername";
import Button from "../Button";
import PopupBody from "./PopupBody";
import { useState } from "react";

export default function LikesPopup() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopupContainer setIsOpen={setIsOpen} isOpen={isOpen}>
      <PopupBody popupHeader="Likes" setIsOpen={setIsOpen}>
        <div className={styles.likesContainer}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((person, i) => (
            <div key={i} className={styles.likedUser}>
              <PicUsername
                src="./baif.jpg"
                primaryText="thebrahimbaif"
                secondaryText="Brahim Baif"
                size="size-3"
              />
              {i % 4 === 0 ? (
                <Button mainColor={false} mainShape={true}>
                  Following
                </Button>
              ) : (
                <Button>Follow</Button>
              )}
            </div>
          ))}
        </div>
      </PopupBody>
    </PopupContainer>
  );
}
