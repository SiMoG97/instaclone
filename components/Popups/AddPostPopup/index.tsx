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

export type ImgFileType = {
  img: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
};

type AddPostPopupType = {
  openProp: boolean;
};

// function AddPostPopup({ openProp }: AddPostPopupType) {
function AddPostPopup() {
  const initDiscardBtns = [
    {
      text: "Discard",
      method: () => {
        setStep(() => 0);
        setFiles(() => []);
        prevStep();
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
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<ImgFileType[]>([] as ImgFileType[]);
  const [showDiscardPopup, setShowDiscardPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const alertDiv = useRef<HTMLDivElement>(null);
  const croppingDiv = useRef<HTMLDivElement>(null);
  const [discardPopupButtons, setDiscardPopupButtons] =
    useState(initDiscardBtns);

  // useEffect(() => {
  //   if (!isOpen) {
  //     // setDiscardPopupButtons(initDiscardBtns);
  //   }
  // }, [isOpen, initDiscardBtns]);
  const headers = useMemo(
    () => ["Create new post", "Crop", "Edit", "Create new post"],
    []
  );

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

  const nextStep = () => {
    if (step === 1) {
      console.log("crop here");
      // cropingFiles();
    }
    setStep((prev) => {
      if (prev === headers.length - 1) {
        return headers.length - 1;
      }
      prev++;
      return prev;
    });
  };

  const prevStep = () => {
    setStep((prev) => {
      if (prev === 0) {
        return prev;
      }
      prev--;
      return prev;
    });
  };

  useEffect(() => {
    // console.log(step);
  }, [nextStep]);
  useEffect(() => {
    setTimeout(() => {
      if (alertDiv.current) {
        alertDiv.current.style.opacity = "0";
      }
    }, 2000);
  }, [alertMessage]);
  // const discardPopupButtons = ;

  const PopupContainerCallback = () => {
    if (step !== 0) {
      const btns = discardPopupButtons;

      btns[0].method = () => {
        setStep(() => 0);
        setFiles(() => []);
        setShowDiscardPopup(() => false);
        setIsOpen(() => false);
      };
      setDiscardPopupButtons(() => btns);
      // console.log(discardPopupButtons[0].method);
      setShowDiscardPopup(() => true);
      return;
    }
    setIsOpen(() => false);
  };
  return (
    <>
      {isOpen ? (
        <>
          <AddPostActive
            className={`${styles.activeIcons} ${styles.strokeNon}`}
            // onClick={() => {
            //   setAddPostRest(false);
            // }}
          />
          {/* <AddPostPopup openProp={addPostRest} /> */}
        </>
      ) : (
        <AddPost
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
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
            />
          }
          setIsOpen={setIsOpen}
          className={styles.postStepsBody}
        >
          <>
            <div style={{ transition: "2s" }}>
              {step === 0 && (
                <ImportImgStep
                  setFiles={setFiles}
                  nextStep={nextStep}
                  setAlertMessage={setAlertMessage}
                />
              )}
              {step === 1 && (
                <CropStep
                  files={files}
                  setFiles={setFiles}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {step === 2 && <EditStep />}
              {step === 3 && <SharePostStep />}
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
          title="Discard post?"
          text="If you leave, your edits won't be saved."
          buttonList={discardPopupButtons}
          popupCloser={setShowDiscardPopup}
        />
      ) : null}
    </>
  );
}

export default AddPostPopup;

/*  check right */
// (right out) should be less than or equal (right in) which means  (right in ) >= (right out)

/*  check left */
// (left in) sould be less than or equal (left out) which neans  (left out) >= (left in)

/*  check top */
// (top in) sould be less than or equal (top out) which neans  (top out) >= (top in)

/*  check bottom */
// (bottom out) sould be less than or equal (bottom in) which neans  (bottom in) >= (bottom out)
