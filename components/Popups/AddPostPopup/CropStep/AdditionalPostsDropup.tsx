import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { ImgFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import styles from "../../popup.module.scss";

import { IconPopup } from "../IconPopup";

type AdditionalPostsDropupProps = AdditionImgsSlideProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdditionalPostsDropup = ({
  isOpen,
  setIsOpen,
  files,
  setFiles,
}: AdditionalPostsDropupProps) => {
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={PostsIcon}
      IconStyle={{ marginLeft: "auto" }}
      style={{ paddingRight: "2rem", width: "100%" }}
      DropUp={<AdditionImgsSlide files={files} setFiles={setFiles} />}
      dropUpStyle={{
        right: "2rem",
        left: "auto",
        maxWidth: "calc(100% - 4rem)",
      }}
    />
  );
};
type AdditionImgsSlideProps = {
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
};

const AdditionImgsSlide = ({ files, setFiles }: AdditionImgsSlideProps) => {
  return (
    <div className={styles.addPostSlide}>
      <div
        className={styles.slideContainer}
        style={{ width: `${files.length * 108}px` }}
      >
        {files.map((file, index) => {
          return (
            <div
              key={index}
              style={{ transform: `translateX(${-index * 108}px)` }}
              className={styles.slideItem}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default AdditionalPostsDropup;
