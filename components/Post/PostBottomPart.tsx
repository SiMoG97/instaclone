import styles from "./postStyles.module.scss";
import LikesPopup from "../Popups/LikesPopup";
import { useState } from "react";

type PostBottomPartType = {
  numberOfComments: number;
  numberOfLikes: number;
};

const PostBottomPart = ({
  numberOfComments,
  numberOfLikes,
}: PostBottomPartType) => {
  const [isOpen, setIsOpen] = useState(false);

  const showLikes = (likes: number) => {
    if (likes > 1) {
      return `${likes} Likes`;
    }
    return `${likes} Like`;
  };
  const viewComments = (cmntNbr: number) => {
    if (cmntNbr === 1) {
      return `View ${cmntNbr} comment`;
    }
    return `View all ${cmntNbr} comments`;
  };
  return (
    <>
      <div className={styles.postBottomPart}>
        <div className={styles.nbrOfLikes}>
          {numberOfLikes === 0 ? (
            <></>
          ) : (
            <div className={styles.nbrOfLikes}>
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {showLikes(numberOfLikes)}
              </div>
            </div>
          )}
        </div>
        <div>
          {numberOfComments === 0 ? (
            <></>
          ) : (
            <div className={styles.viewComments}>
              <div>{viewComments(numberOfComments)}</div>
            </div>
          )}
        </div>
        <div className={styles.date}>2 DAYS AGO</div>
      </div>
      <LikesPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default PostBottomPart;

// const ViewComments = ({ nbrCmnt }: { nbrCmnt: number }) => {
//   if (nbrCmnt === 0) return <></>;
//   if (nbrCmnt > 1) {
//     return (
//       <div className={styles.viewComments}>
//         <div>View all {nbrCmnt} comments</div>
//       </div>
//     );
//   }
//   return (
//     <div className={styles.viewComments}>
//       <div>View {nbrCmnt} comment</div>
//     </div>
//   );
// };

const PostDescription = () => {
  <div></div>;
};
