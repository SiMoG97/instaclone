import React, { useCallback, useMemo, useState } from "react";
import PopupBody from "../PopupBody";
import PopupContainer, { SetIsOpenType } from "../PopupContainer";
import { CropStep } from "./CropStep";
import { EditStep } from "./EditStep";
import { ImportImgStep } from "./ImportImgStep";
import { SharePostStep } from "./SharePostStep";

function AddPostPopup() {
  const [step, setStep] = useState(0);

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

  return (
    <PopupContainer isXout={true}>
      {(setIsOpen: SetIsOpenType) => (
        <PopupBody
          isXin={false}
          popupHeader={headers[step]}
          setIsOpen={setIsOpen}
          style={{ width: "auto" }}
        >
          <>
            <div style={{ backgroundColor: "red", transition: "2s" }}>
              {step === 0 && <ImportImgStep />}
              {step === 1 && <CropStep />}
              {step === 2 && <EditStep />}
              {step === 3 && <SharePostStep />}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "10rem",
                left: "50%",
                transform: "translate(-50%,0)",
              }}
            >
              <button onClick={prevStep}>PrevStep</button>
              <button onClick={nextStep}>nexStep</button>
            </div>
          </>
        </PopupBody>
      )}
    </PopupContainer>
  );
}

export default AddPostPopup;
