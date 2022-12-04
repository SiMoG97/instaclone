import { Reorder, AnimatePresence, motion } from "framer-motion";

import { ImgFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import IconCircle from "../../../CommonComponents/IconCircle";
import styles from "../../popup.module.scss";
import CrossIcon from "../../../../public/smallCross.svg";

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
  selectedFile,
  setSelectedFile,
}: AdditionalPostsDropupProps) => {
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={PostsIcon}
      IconStyle={{ marginLeft: "auto" }}
      style={{ paddingRight: "2rem", width: "100%" }}
      DropUp={
        <AdditionImgsSlide
          selectedFile={selectedFile}
          files={files}
          setFiles={setFiles}
          setSelectedFile={setSelectedFile}
        />
      }
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
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
};

const AdditionImgsSlide = ({
  files,
  setFiles,
  selectedFile,
  setSelectedFile,
}: AdditionImgsSlideProps) => {
  return (
    <div className={styles.addPostSlide}>
      <Reorder.Group
        as="div"
        axis="x"
        className={styles.slideContainer}
        style={{ width: `${files.length * (95 + 13)}px` }}
        onReorder={setFiles}
        values={files}
      >
        <AnimatePresence initial={false}>
          {files.map((file, index) => {
            return (
              <SliderItem
                file={file}
                key={file.img.src}
                imgSrc={file.img.src}
                isSelected={selectedFile === index}
                onMouseDown={() => setSelectedFile(() => index)}
              />
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};

type SliderItemProps = {
  file: ImgFileType;
  imgSrc: string;
  isSelected: boolean;
  onMouseDown: () => void;
};
const SliderItem = ({
  imgSrc,
  isSelected,
  onMouseDown,
  file,
}: SliderItemProps) => {
  return (
    <Reorder.Item
      as="div"
      value={file}
      className={styles.slideItem}
      style={isSelected ? { filter: "brightness(1)" } : {}}
      onMouseDown={onMouseDown}
    >
      <motion.div
        className={styles.images}
        style={{ backgroundImage: bgImg(imgSrc) }}
      ></motion.div>
      {isSelected ? (
        <motion.div className={styles.crossIconContainer}>
          <IconCircle
            Icon={CrossIcon}
            style={{ width: "2rem", height: "2rem" }}
          />
        </motion.div>
      ) : null}
    </Reorder.Item>
  );
};

function bgImg(src: string) {
  return `url("${src.replace(/(\r\n|\n|\r)/gm, "")}")`;
}

export default AdditionalPostsDropup;
