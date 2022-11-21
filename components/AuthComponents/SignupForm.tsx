import { useState } from "react";

import { SignupStepOneTypes } from "../../utils/GlobalTypes";
import { StepOne, StepTwo } from "./";

export const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<SignupStepOneTypes>(
    {} as SignupStepOneTypes
  );
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
