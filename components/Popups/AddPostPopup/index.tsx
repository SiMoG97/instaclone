import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PopupBody from "../PopupBody";
import PopupContainer, { SetIsOpenType } from "../PopupContainer";
import { CropStep } from "./CropStep";
import { EditStep } from "./EditStep";
import { ImportImgStep } from "./ImportImgStep";
import { SharePostStep } from "./SharePostStep";
import styles from "../popup.module.scss";

export type ImgFileType = {
  img: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
};

function AddPostPopup() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<ImgFileType[]>([] as ImgFileType[]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const alertDiv = useRef<HTMLDivElement>(null);
  const headers = useMemo(
    () => ["Create new post", "Crop", "Edit", "Create new post"],
    []
  );

  const nextStep = useCallback(() => {
    setStep((prev) => {
      if (prev === headers.length - 1) {
        return headers.length - 1;
      }
      prev++;
      console.log(prev);
      return prev;
    });
  }, [headers.length]);

  const prevStep = useCallback(() => {
    setStep((prev) => {
      if (prev === 0) {
        return prev;
      }
      prev--;
      console.log(prev);
      return prev;
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (alertDiv.current) {
        alertDiv.current.style.opacity = "0";
      }
    }, 2000);
  }, [alertMessage]);
  return (
    <PopupContainer isXout={true}>
      {(setIsOpen: SetIsOpenType) => (
        <PopupBody
          isXin={false}
          popupHeader={headers[step]}
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
      )}
    </PopupContainer>
  );
}

export default AddPostPopup;
