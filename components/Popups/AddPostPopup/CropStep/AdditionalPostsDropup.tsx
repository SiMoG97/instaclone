import { Reorder, AnimatePresence, motion } from "framer-motion";

import { ImgVidFileType } from "..";
import PostsIcon from "../../../../public/postsIcon.svg";
import IconCircle from "../../../CommonComponents/IconCircle";
import styles from "../../popup.module.scss";
import CrossIcon from "../../../../public/smallCross.svg";
import PlusIcon from "../../../../public/plusIcon.svg";

import { IconPopup } from "../IconPopup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SmallPopup from "../../SmallPopup";
import { FileInput } from "../../../FormComponents/FileInput";
import FileExtChecker from "../../../../utils/FileExtChecker";
import ArrowL from "../../../../public/arrowL.svg";
import ArrowR from "../../../../public/arrowR.svg";
import { newFileConstructor } from "../ImportFileStep/newFileConstructor";
import { pushVidToState } from "../ImportFileStep/pushVidToState";
import { pushImgToState } from "../ImportFileStep/pushImgToState";

type AdditionalPostsDropupProps = AdditionImgsSlideProps & {
  // isOpen: boolean;
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
  const [active, setActive] = useState(false);
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={PostsIcon}
      IconStyle={{}}
      active={active}
      setActive={setActive}
      style={{
        paddingRight: "2rem",
        right: "0",
      }}
      DropUp={
        <AdditionImgsSlide
          isOpen={isOpen}
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
        bottom: "6rem",
      }}
    />
  );
};
type AdditionImgsSlideProps = {
  isOpen: boolean;
  files: ImgVidFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgVidFileType[]>>;
  selectedFile: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<number>>;
  selectedFileIdRef: React.MutableRefObject<string>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AdditionImgsSlide = ({
  isOpen,
  files,
  setFiles,
  setSelectedFile,
  selectedFileIdRef,
  setStep,
  selectedFile,
  setAlertMessage,
}: AdditionImgsSlideProps) => {
  const sliderContainer = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [_, ForceRender] = useState(0);
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
        if (slider.current && slideDetails.current.nbrOfParts > 1) {
          // slider.current.style.transform = `translateX(${
          //   -slideDetails.current.translateX + 95 + 13
          // }px)`;
        }
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

  const slideDetails = useRef({
    nbrOfParts: 0,
    part: 1,
    translateX: 0,
  });
  // const [slideDetails, setSlideDetails] = useState({
  //   nbrOfParts: 0,
  //   part: 0,
  // });

  const slideLeft = () => {
    if (!slider.current || !sliderContainer.current) return;
    const { nbrOfParts, part } = slideDetails.current;
    if (part === nbrOfParts && nbrOfParts % 1 < 1 && nbrOfParts % 1 > 0) {
      slideDetails.current.part = nbrOfParts - (nbrOfParts % 1);
    } else if (part === 1) {
      slideDetails.current.part = 1;
    } else {
      slideDetails.current.part = part - 1;
    }
    slideDetails.current.translateX =
      slideDetails.current.part * sliderContainer.current.offsetWidth -
      sliderContainer.current.offsetWidth;
    slider.current.style.transform = `translateX(${-slideDetails.current
      .translateX}px)`;
    ForceRender((curr) => curr + 1);
  };

  const slideRight = () => {
    if (!slider.current || !sliderContainer.current) return;
    const { nbrOfParts, part } = slideDetails.current;
    if (part + 1 < nbrOfParts) {
      slideDetails.current.part = part + 1;
    } else {
      slideDetails.current.part = nbrOfParts;
    }
    slideDetails.current.translateX =
      slideDetails.current.part * sliderContainer.current.offsetWidth -
      sliderContainer.current.offsetWidth;
    slider.current.style.transform = `translateX(${-slideDetails.current
      .translateX}px)`;
    ForceRender((curr) => curr + 1);
  };

  const sliderHandler = () => {
    setTimeout(() => {
      if (!slider.current || !sliderContainer.current) return;
      const sliderContainerWidth =
        sliderContainer.current.getBoundingClientRect().width;
      const sliderWidth = slider.current.getBoundingClientRect().width;
      slideDetails.current.nbrOfParts =
        sliderWidth / (sliderContainerWidth - 20);
      if (sliderWidth / sliderContainerWidth <= 1) {
        slider.current.style.transform = "translateX(0)";
      }
      ForceRender((curr) => curr + 1);
    }, 300);
  };

  useEffect(() => {
    sliderHandler();
    console.log("wow");
  }, [files]);
  useLayoutEffect(() => {
    window.addEventListener("resize", sliderHandler);
    return () => {
      window.removeEventListener("resize", sliderHandler);
    };
  }, []);

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
      const { fileType, isFileAllowed } = FileExtChecker(file.name);

      if (!isFileAllowed) continue;
      if (file.size < 4096) continue;
      if (fileType === "video" && file.size > 100000000) continue;
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
    // const imgFilesArr: ImgFileType[] = [];
    allowedFilesArr.forEach((file: File, i) => {
      const { fileType } = FileExtChecker(file.name);
      if (fileType === "image") {
        pushImgToState({ file, setFiles });
      } else {
        pushVidToState({ file, setFiles });
      }
    });
  };
  return (
    <>
      <div className={styles.addPostSlide} ref={sliderContainer}>
        <div
          style={{ position: "relative" }}
          className={styles.groupContaienr}
          ref={sliderContainer}
        >
          <Reorder.Group
            as="div"
            axis="x"
            className={styles.slideContainer}
            style={{ width: `${files.length * (95 + 13) - 13}px` }}
            onReorder={setFiles}
            values={files}
            ref={slider}
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
          {/* // {slideDetails.nbrOfParts > 1 ? ( */}
          {slideDetails.current.nbrOfParts > 1 ? (
            <>
              {slideDetails.current.nbrOfParts > slideDetails.current.part ? (
                <div
                  className={`${styles.arrow} ${styles.right}`}
                  onClick={slideRight}
                >
                  <IconCircle light Icon={ArrowR} />
                </div>
              ) : null}
              {slideDetails.current.part !== 1 ? (
                <div
                  className={`${styles.arrow} ${styles.left}`}
                  onClick={slideLeft}
                >
                  <IconCircle light Icon={ArrowL} />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
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
  file: ImgVidFileType;
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
