import React, { Dispatch, SetStateAction } from "react";
import ArrowLeft from "../../public/leftArrow.svg";
import ChatDetailsIcon from "../../public/ChatDetails.svg";

import styles from "./Dm.module.scss";

type DetailsProps = {
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  showDetails: boolean;
};

export const Details = ({ setShowDetails, showDetails }: DetailsProps) => {
  return (
    // <div>
    <div
      className={`${styles.detailsContainer} ${
        showDetails && styles.showDetails
      }`}
    >
      <div
        className={`${styles.chatHeader} ${styles.shrinkHeader}  ${
          !showDetails && styles.displayNoneDesktop
        }`}
      >
        <div>
          <div
            className={styles.arrowChat}
            onClick={() => {
              setShowDetails(false);
            }}
          >
            <ArrowLeft />
          </div>
        </div>
        <div
          style={{
            fontSize: "1.6rem",
            fontWeight: "500",
            color: "var(--txt-c-1)",
          }}
        >
          Details
        </div>
        <div>
          <ChatDetailsIcon
            className={`${styles.detailsIcon} ${styles.activeDetailsIcon}`}
            onClick={() => {
              setShowDetails(false);
            }}
          />
        </div>
      </div>
      <div
        className={`${styles.detailsBody} ${
          !showDetails && styles.displayNoneDesktop
        }`}
      >
        test
      </div>
    </div>
    // </div>
  );
};
