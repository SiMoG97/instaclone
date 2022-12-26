import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import html2canvas from "html2canvas";
import PopupBody from "../PopupBody";
import PopupContainer, { SetIsOpenType } from "../PopupContainer";
import { CropStep } from "./CropStep";
import { EditStep } from "./EditStep";
import { ImportImgStep } from "./ImportImgStep";
import { SharePostStep } from "./SharePostStep";
import { NextPrevStepHeader } from "./NextPrevStepHeader";
import styles from "../popup.module.scss";
import SmallPopup from "../SmallPopup";
import AddPost from "../../../public/addPost.svg";
import AddPostActive from "../../../public/addPostActive.svg";
import SidebarContainer from "./SidebarContainer";

export type ImgFileType = {
  img: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
  id: string;
};

type AddPostPopupType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type FiltersType =
  | "Original"
  | "Clarendon"
  | "Gingham"
  | "Moon"
  | "Lark"
  | "Reyes"
  | "Juno"
  | "Slumber"
  | "Crema"
  | "Ludwig"
  | "Aden"
  | "Perpetua";
export type ARStateType =
  | "original"
  | "oneToOne"
  | "fourToFive"
  | "sixteenToNine";

const headers = ["Create new post", "Crop", "Edit", "Create new post"];

function AddPostPopup({ isOpen, setIsOpen }: AddPostPopupType) {
  const [aspectRatio, setAspectRatio] = useState<ARStateType>("oneToOne");

  const initDiscardBtns = [
    {
      text: "Discard",
      method: () => {
        setStep(() => 0);
        setFiles(() => []);
        // setSelectedFile({} as ImgFileType);
        setSelectedFile(0);
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
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<ImgFileType[]>([] as ImgFileType[]);
  // const [selectedFile, setSelectedFile] = useState<ImgFileType>(
  //   {} as ImgFileType
  // );
  const [selectedFile, setSelectedFile] = useState(0);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const alertDiv = useRef<HTMLDivElement>(null);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const selectedFileIdRef = useRef<string>("");

  const [discardPopupButtons, setDiscardPopupButtons] =
    useState(initDiscardBtns);

  useEffect(() => {
    if (!isOpen) {
      setDiscardPopupButtons(initDiscardBtns);
    }
  }, [isOpen]);

  const cropingFiles = () => {
    files.forEach(async (file) => {
      if (croppingDiv.current) {
        const { img, scale, x, y } = file;
        const cropdiv = croppingDiv.current;
        // cropdiv.style.backgroundImage =
        cropdiv.style.backgroundImage = `url("${img.src.replace(
          /(\r\n|\n|\r)/gm,
          ""
        )}")`;
        cropdiv.style.transform = `scale(${scale}) translate(${x},${y})`;
        // const canvas = await html2canvas(cropdiv);
        // const image = canvas.toDataURL("image/png", 0.5);
        // console.log(image);
      }
    });
  };

  const nextStep = useCallback(() => {
    if (step === 1) {
      console.log("crop here");
    }
    setStep((prev) => {
      if (prev === headers.length - 1) {
        return headers.length - 1;
      }
      prev++;
      return prev;
    });
  }, [headers.length, step]);

  const prevStep = () => {
    setStep((prev) => {
      if (prev === 0) {
        return prev;
      }
      prev--;
      return prev;
    });
  };
  // function nextFile() {
  //   setSelectedFile((currFile) => {
  //     let i = files.indexOf(currFile);
  //     if (i >= files.length - 1) {
  //       return files[i];
  //     }
  //     i++;
  //     return files[i];
  //   });
  // }
  // function prevFile() {
  //   setSelectedFile((currFile) => {
  //     let i = files.indexOf(currFile);
  //     if (i <= 0) {
  //       return files[0];
  //     }
  //     i--;
  //     return files[i];
  //   });
  // }
  function nextFile() {
    setSelectedFile((i) => {
      if (i >= files.length - 1) {
        return i;
      }
      i++;
      return i;
    });
  }
  function prevFile() {
    setSelectedFile((i) => {
      if (i <= 0) {
        return 0;
      }
      i--;
      return i;
    });
  }
  useEffect(() => {
    if (!files[selectedFile]) return;
    selectedFileIdRef.current = files[selectedFile].id;
  }, [selectedFile]);
  // function selectFile(idx: number) {
  //   let i = idx;
  //   if (idx > files.length - 1) {
  //     i = files.length - 1;
  //   } else if (idx < 0) {
  //     i = 0;
  //   }
  //   setSelectedFile(() => i);
  // }

  useEffect(() => {
    setTimeout(() => {
      if (alertDiv.current) {
        alertDiv.current.style.opacity = "0";
      }
    }, 2000);
  }, [alertMessage]);

  const PopupContainerCallback = () => {
    console.log("click out");
    if (step !== 0) {
      const btns = discardPopupButtons;
      btns[0].method = () => {
        setStep(() => 0);
        setFiles(() => []);
        setShowDiscardPopup(() => false);
        setIsOpen(() => false);
      };
      setDiscardPopupButtons(() => btns);
      setShowDiscardPopup(() => true);
      return;
    }
    setIsOpen(() => false);
  };
  return (
    <>
      <PopupContainer
        isXout={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callback={PopupContainerCallback}
      >
        <PopupBody
          isXin={false}
          popupHeader={
            <NextPrevStepHeader
              prevStep={prevStep}
              nextStep={nextStep}
              setShowDiscardPopup={setShowDiscardPopup}
              headerTitle={headers[step]}
              step={step}
              setIsOpen={setIsOpen}
            />
          }
          setIsOpen={setIsOpen}
          className={styles.postStepsBody}
        >
          <>
            <div
              className={styles.previewAndSidebarContainer}
              style={{ transition: "2s", display: "flex" }}
            >
              {step === 0 ? (
                <ImportImgStep
                  files={files}
                  setFiles={setFiles}
                  nextStep={nextStep}
                  setAlertMessage={setAlertMessage}
                  setSelectedFile={setSelectedFile}
                  selectedFileIdRef={selectedFileIdRef}
                />
              ) : null}
              {step === 1 ? (
                <CropStep
                  files={files}
                  setFiles={setFiles}
                  nextFile={nextFile}
                  prevFile={prevFile}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  selectedFileIdRef={selectedFileIdRef}
                  setStep={setStep}
                  setAlertMessage={setAlertMessage}
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                />
              ) : null}
              {step === 2 ? (
                <>
                  <EditStep
                    files={files}
                    setFiles={setFiles}
                    nextFile={nextFile}
                    prevFile={prevFile}
                    aspectRatio={aspectRatio}
                  />
                </>
              ) : null}
              {step === 3 ? <SharePostStep /> : null}
              {/*  */}
              {/* Sidebar */}
              <SidebarContainer step={step} />
              {/* <div
                style={{
                  width: step > 1 ? "300px" : "0",
                  height: step > 1 ? "auto" : "0",
                  background: "red",
                  transition: "width 0.3s",
                }}
              ></div> */}
              {/* Sidebar */}
              {/*  */}
            </div>
            {alertMessage ? (
              <div ref={alertDiv} className={styles.alertMessage}>
                {alertMessage}
              </div>
            ) : null}
          </>
        </PopupBody>
      </PopupContainer>
      {showDiscardPopup ? (
        <SmallPopup
          titleOrPic="Discard post?"
          text="If you leave, your edits won't be saved."
          buttonList={discardPopupButtons}
          popupCloser={setShowDiscardPopup}
        />
      ) : null}
    </>
  );
}

export default AddPostPopup;

export const originalArCalcul = (width: number, height: number) => {
  let ar = width / height;
  if (ar === 1) {
    return {
      width: "100%",
      height: "100%",
    };
  }
  if (ar > 1.91) {
    ar = 1.91;
  } else if (ar < 0.8) {
    ar = 0.8;
  }
  if (ar > 1) {
    return {
      width: "100%",
      height: `calc(100% / ${ar})`,
    };
  } else if (ar < 1) {
    return {
      // width: `calc(${width}px * ${ar})`,
      width: `calc(100% * ${ar})`,
      height: "100%",
    };
  } else {
    return {
      width: "auto",
      height: "auto",
    };
  }
};
