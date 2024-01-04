import { useEffect, useState } from "react";

import { SignupStepOneTypes } from "../../utils/GlobalTypes";
import { StepOne, StepTwo } from "./";

export const SignupForm = () => {
  const [step, setStep] = useState(0);
  const [stepOneData, setStepOneData] = useState<SignupStepOneTypes>(
    {} as SignupStepOneTypes
  );
  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        alert(
          "Create account with credentials is not working yet, try using Google auth"
        );
      }, 2000);
    }
  }, [step]);
  return (
    <>
      <div style={step !== 0 ? { display: "none" } : {}}>
        <StepOne setStep={setStep} setStepOneData={setStepOneData} />
      </div>
      <div style={step !== 1 ? { display: "none" } : {}}>
        <StepTwo setStep={setStep} stepOneData={stepOneData} />
      </div>
    </>
  );
};
