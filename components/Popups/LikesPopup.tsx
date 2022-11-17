import PopupContainer, { SetIsOpenType } from "./PopupContainer";
import styles from "./popup.module.scss";
import PicUsername from "../PicUsername";
import Button from "../Button";
import PopupBody from "./PopupBody";
import { useState } from "react";

type LikesPopup = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LikesPopup({ isOpen, setIsOpen }: LikesPopup) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <PopupContainer setIsOpen={setIsOpen} isOpen={isOpen}>
      <PopupBody
        popupHeader="Likes"
        setIsOpen={setIsOpen}
        style={{ width: "400px", height: "400px" }}
      >
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
