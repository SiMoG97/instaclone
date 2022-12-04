import { Reorder, AnimatePresence, motion } from "framer-motion";

import { ImgFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import IconCircle from "../../../CommonComponents/IconCircle";
import styles from "../../popup.module.scss";
import CrossIcon from "../../../../public/smallCross.svg";

import { IconPopup } from "../IconPopup";
import { useState } from "react";

type AdditionalPostsDropupProps = AdditionImgsSlideProps & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdditionalPostsDropup = ({
  isOpen,
  setIsOpen,
  files,
  setFiles,
  setSelectedFile,
  selectedFileIdRef,
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
          files={files}
          setFiles={setFiles}
          setSelectedFile={setSelectedFile}
          selectedFileIdRef={selectedFileIdRef}
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
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  selectedFileIdRef: React.MutableRefObject<string>;
};

const AdditionImgsSlide = ({
  files,
  setFiles,
  setSelectedFile,
  selectedFileIdRef,
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
                isSelected={file.id === selectedFileIdRef.current}
                onMouseUp={() => {
                  selectedFileIdRef.current = file.id;
                  setSelectedFile(() => index);
                }}
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
  onMouseUp: () => void;
};
const SliderItem = ({
  imgSrc,
  isSelected,
  onMouseUp,
  file,
}: SliderItemProps) => {
  return (
    <Reorder.Item
      as="div"
      value={file}
      className={styles.slideItem}
      style={isSelected ? { filter: "brightness(1)" } : {}}
      onMouseUp={onMouseUp}
      // onMouseUp
    >
      <div
        className={styles.images}
        style={{ backgroundImage: bgImg(imgSrc) }}
      ></div>
      {isSelected ? (
        <div className={styles.crossIconContainer}>
          <IconCircle
            Icon={CrossIcon}
            style={{ width: "2rem", height: "2rem" }}
          />
        </div>
      ) : null}
    </Reorder.Item>
  );
};

function bgImg(src: string) {
  return `url("${src.replace(/(\r\n|\n|\r)/gm, "")}")`;
}

export default AdditionalPostsDropup;
