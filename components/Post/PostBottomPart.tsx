import React from "react";
import styles from "./postStyles.module.scss";

type PostBottomPartType = {
  numberOfComments: number;
};

const PostBottomPart = ({ numberOfComments }: PostBottomPartType) => {
  return (
    <div className={styles.postBottomPart}>
      <ViewComments nbrCmnt={numberOfComments} />
      <div className={styles.date}>2 DAYS AGO</div>
    </div>
  );
};

export default PostBottomPart;

const ViewComments = ({ nbrCmnt }: { nbrCmnt: number }) => {
  if (nbrCmnt === 0) return <></>;
  if (nbrCmnt > 1) {
    return (
      <div className={styles.viewComments}>
        <div>View all {nbrCmnt} comments</div>
      </div>
    );
  }
  return (
    <div className={styles.viewComments}>
      <div>View {nbrCmnt} comment</div>
    </div>
  );
};

const PostDescription = () => {
  <div></div>;
};
