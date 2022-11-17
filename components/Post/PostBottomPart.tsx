import styles from "./postStyles.module.scss";
import LikesPopup from "../Popups/LikesPopup";
import { useState } from "react";

type PostBottomPartType = {
  numberOfLikes: number;
  children?: JSX.Element;
};

const PostBottomPart = ({ numberOfLikes, children }: PostBottomPartType) => {
  const [isLikesPopupOpen, setIsLikesPopupOpen] = useState(false);

  return (
    <>
      <div className={styles.postBottomPart}>
        <div className={styles.nbrOfLikes}>
          <div className={styles.nbrOfLikes}>
            <div
              onClick={() => {
                setIsLikesPopupOpen(true);
              }}
            >
              {showLikes(numberOfLikes)}
            </div>
          </div>
        </div>
        {children}
        <div className={styles.date}>2 DAYS AGO</div>
      </div>
      {isLikesPopupOpen ? (
        <LikesPopup isOpen={isLikesPopupOpen} setIsOpen={setIsLikesPopupOpen} />
      ) : (
        <></>
      )}
    </>
  );
};

type ViewCommentsBtnProps = {
  numberOfComments: number;
  setOpenPopupPost: React.Dispatch<React.SetStateAction<boolean>>;
};
const viewComments = (cmntNbr: number) => {
  if (cmntNbr === 1) {
    return `View ${cmntNbr} comment`;
  }
  return `View all ${cmntNbr} comments`;
};
export const ViewCommentsBtn = ({
  numberOfComments,
  setOpenPopupPost,
}: ViewCommentsBtnProps) => {
  return (
    <div>
      {numberOfComments === 0 ? (
        <></>
      ) : (
        <div
          className={styles.viewComments}
          onClick={() => {
            setOpenPopupPost(true);
          }}
        >
          <div>{viewComments(numberOfComments)}</div>
        </div>
      )}
    </div>
  );
};

export const showLikes = (likes: number) => {
  if (likes === 0) {
    return (
      <>
        Be the first to <strong>like this</strong>
      </>
    );
  }
  if (likes > 1) {
    return `${likes} Likes`;
  }
  return `${likes} Like`;
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
