import { Reorder, AnimatePresence, motion } from "framer-motion";

import { ImgFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import IconCircle from "../../../CommonComponents/IconCircle";
import styles from "../../popup.module.scss";
import CrossIcon from "../../../../public/smallCross.svg";

import { IconPopup } from "../IconPopup";
import { useEffect, useState } from "react";
import SmallPopup from "../../SmallPopup";

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
  setStep,
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
          setStep={setStep}
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
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const AdditionImgsSlide = ({
  files,
  setFiles,
  setSelectedFile,
  selectedFileIdRef,
  setStep,
}: AdditionImgsSlideProps) => {
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);

  const DiscardBtns = [
    {
      text: "Discard",
      method: () => {
        const newFiles = files.filter(
          (file) => file.id !== selectedFileIdRef.current
        );
        setFiles(() => newFiles);
        setSelectedFile((currIdx) => {
          if (currIdx === 0) {
            selectedFileIdRef.current = files[0].id;
            return 0;
          }
          selectedFileIdRef.current = files[currIdx - 1].id;
          return currIdx - 1;
        });
        setShowDiscardPopup(() => false);
      },
      danger: true,
    },
    {
      text: "Cancel",
      method: () => {
        setShowDiscardPopup(() => false);
      },
    },
  ];
  useEffect(() => {
    if (files.length === 0) {
      setStep(() => 0);
    }
  }, [files.length]);
  return (
    <>
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
                  key={file.id}
                  imgSrc={file.img.src}
                  isSelected={file.id === selectedFileIdRef.current}
                  setShowDiscardPopup={setShowDiscardPopup}
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
      {showDiscardPopup ? (
        <SmallPopup
          titleOrPic="Discard photo?"
          text="This will remove the photo from your post."
          buttonList={DiscardBtns}
          popupCloser={setShowDiscardPopup}
        />
      ) : null}
    </>
  );
};

type SliderItemProps = {
  file: ImgFileType;
  imgSrc: string;
  isSelected: boolean;
  onMouseUp: () => void;
  setShowDiscardPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const SliderItem = ({
  imgSrc,
  isSelected,
  onMouseUp,
  file,
  setShowDiscardPopup,
}: SliderItemProps) => {
  return (
    <Reorder.Item
      as="div"
      value={file}
      className={styles.slideItem}
      style={isSelected ? { filter: "brightness(1)" } : {}}
      onMouseUp={onMouseUp}
    >
      <div
        className={styles.images}
        style={{ backgroundImage: bgImg(imgSrc) }}
      ></div>
      {isSelected ? (
        <div
          className={styles.crossIconContainer}
          onClick={() => setShowDiscardPopup(true)}
        >
          <IconCircle
            Icon={CrossIcon}
            style={{ width: "2rem", height: "2rem", pointerEvents: "none" }}
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
