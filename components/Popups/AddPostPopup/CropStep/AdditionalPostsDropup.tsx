import { Reorder, AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { ImgFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import IconCircle from "../../../CommonComponents/IconCircle";
import styles from "../../popup.module.scss";
import CrossIcon from "../../../../public/smallCross.svg";
import PlusIcon from "../../../../public/plusIcon.svg";

import { IconPopup } from "../IconPopup";
import { useEffect, useRef, useState } from "react";
import SmallPopup from "../../SmallPopup";
import { FileInput } from "../../../FormComponents/FileInput";
import FileExtChecker from "../../../../utils/FileExtChecker";

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
  selectedFile,
  setAlertMessage,
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
          selectedFile={selectedFile}
          setAlertMessage={setAlertMessage}
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
  selectedFileIdRef: React.MutableRefObject<string>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AdditionImgsSlide = ({
  files,
  setFiles,
  setSelectedFile,
  selectedFileIdRef,
  setStep,
  selectedFile,
  setAlertMessage,
}: AdditionImgsSlideProps) => {
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const DiscardBtns = [
    {
      text: "Discard",
      method: () => {
        const newFiles = files.filter(
          (file) => file.id !== selectedFileIdRef.current
        );

        if (newFiles.length > 0) {
          if (selectedFile === 0) {
            selectedFileIdRef.current = newFiles[0].id;
          } else {
            selectedFileIdRef.current = newFiles[selectedFile - 1].id;
          }
        }
        setFiles(() => newFiles);
        setSelectedFile((currIdx) => {
          if (currIdx === 0) {
            return 0;
          }
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      validteFiles(uploadedFiles);
    }
  }

  const validteFiles = (uploadedFiles: FileList) => {
    const nbrOfFileAllowedToUpload = 10 - files.length;
    let arrFiles = Object.keys(uploadedFiles)
      .map((obj: any) => uploadedFiles[obj])
      .slice(0, nbrOfFileAllowedToUpload);
    const allowedFilesArr = [];
    for (const file of arrFiles) {
      const fileSize = file.size;
      const filename = file.name;
      if (!FileExtChecker(filename)) continue;
      if (fileSize < 4096) continue;
      allowedFilesArr.push(file);
    }
    if (uploadedFiles.length > allowedFilesArr.length) {
      const notUploadedFilesNbr = uploadedFiles.length - allowedFilesArr.length;
      const messageAlert =
        notUploadedFilesNbr === 1
          ? `${notUploadedFilesNbr} file is not uploaded. You can only chose 10 or fewer files.`
          : `${notUploadedFilesNbr} files are not uploaded. You can only chose 10 or fewer files.`;
      setAlertMessage(messageAlert);
    }
    const imgFilesArr: ImgFileType[] = [];
    allowedFilesArr.forEach((file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = new Image();
        img.src = `${reader.result}`;
        imgFilesArr.push({ img, scale: 1, x: 0, y: 0, id: uuidv4() });
      });
      reader.readAsDataURL(file);
    });
    setTimeout(() => {
      console.log(imgFilesArr, imgFilesArr.length);
      setFiles((currFiles) => [...currFiles, ...imgFilesArr]);
    }, 100);
  };
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
        {files.length < 10 ? (
          <div className={styles.addFileButtonContainer}>
            <div
              className={styles.circle}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              <PlusIcon />
            </div>
          </div>
        ) : null}
      </div>
      {showDiscardPopup ? (
        <SmallPopup
          titleOrPic="Discard photo?"
          text="This will remove the photo from your post."
          buttonList={DiscardBtns}
          popupCloser={setShowDiscardPopup}
        />
      ) : null}
      <FileInput ref={inputRef} onChange={handleInputChange} />
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
