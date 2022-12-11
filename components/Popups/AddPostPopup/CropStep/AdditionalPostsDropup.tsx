import { Reorder, AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { ImgFileType } from "..";
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
  return (
    <IconPopup
      someDropOpen={isOpen}
      setSomeDropOpen={setIsOpen}
      Icon={PostsIcon}
      IconStyle={{}}
      style={{
        paddingRight: "2rem",
        right: "0",
        // width: "100%",
        // width: "3rem",
        // position: "unset",
        // transform: "translateY(-20px)",
        // marginLeft: "auto",
      }}
      // unmount={false}
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
  files: ImgFileType[];
  setFiles: React.Dispatch<React.SetStateAction<ImgFileType[]>>;
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
  const [_, setForceUpdate] = useState(0);
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
          slider.current.style.transform = `translateX(${
            -slideDetails.current.translateX - 95
          }px)`;
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
    part: 0,
    translateX: 0,
  });
  // const [slideDetails, setSlideDetails] = useState({
  //   nbrOfParts: 0,
  //   part: 0,
  // });

  const slideLeft = () => {
    if (!slider.current || !sliderContainer.current) return;

    // if()
  };
  const slideRight = () => {
    if (!slider.current || !sliderContainer.current) return;
    const { nbrOfParts, part } = slideDetails.current;
    // const { nbrOfParts, part } = slideDetails;
    if (part + 1 < nbrOfParts - 1) {
      slideDetails.current.part = part + 1;
      // setSlideDetails((currDetails) => ({
      //   ...currDetails,
      //   part: currDetails.part + 1,
      // }));
    } else {
      slideDetails.current.part = nbrOfParts - 1;
      // setSlideDetails((currDetails) => ({
      //   ...currDetails,
      //   part: currDetails.nbrOfParts - 1,
      // }));
    }
    console.log(slideDetails.current.part);
    const slidContainerWidth =
      sliderContainer.current.getBoundingClientRect().width;
    slideDetails.current.translateX =
      slidContainerWidth * slideDetails.current.part;
    slider.current.style.transform = `translateX(${slideDetails.current.translateX}px)`;
    // slidContainerWidth * slideDetails.part + 20
    // setForceUpdate((curr) => curr + 1);
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
      // setForceUpdate((curr) => curr + 1);
      // setSlideDetails((currDetails) => ({
      //   ...currDetails,
      //   nbrOfParts: sliderWidth / sliderContainerWidth,
      // }));
      console.log(
        "from function",
        slider.current?.getBoundingClientRect().width
      );
      // console.log(slideDetails.current);
    }, 500);
  };

  useEffect(() => {
    sliderHandler();
  }, [files]);
  // }, [slider.current?.offsetWidth]);

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
      if (!FileExtChecker(file.name)) continue;
      if (file.size < 4096) continue;
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
    allowedFilesArr.forEach((file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = new Image();
        img.src = `${reader.result}`;
        setFiles((currFiles) => [
          ...currFiles,
          { img, scale: 1, x: 0, y: 0, id: uuidv4() },
        ]);
        console.log("wow");
        // imgFilesArr.push({ img, scale: 1, x: 0, y: 0, id: uuidv4() });
      });
      reader.readAsDataURL(file);
    });
    // console.log(reader);
    // setTimeout(() => {
    //   // console.log(imgFilesArr, imgFilesArr.length);
    //   setFiles((currFiles) => [...currFiles, ...imgFilesArr]);
    // }, 100);
  };
  // console.log(slideDetails);
  // console.log(slideDetails);
  // console.log("hmmm");
  console.log(slider.current?.getBoundingClientRect().width);
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
              {slideDetails.current.nbrOfParts - 1 >
              slideDetails.current.part ? (
                <div
                  className={`${styles.arrow} ${styles.right}`}
                  onClick={slideRight}
                >
                  <IconCircle light Icon={ArrowR} />
                </div>
              ) : null}
              <div className={`${styles.arrow} ${styles.left}`}>
                <IconCircle light Icon={ArrowL} />
              </div>
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
