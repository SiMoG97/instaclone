import { useState } from "react";

import SignupContextProvider from "../../context/SignupContext";
import { StepOne, StepTwo } from "./";

export const SignupForm = () => {
  const [step, setStep] = useState(0);

  return (
    <SignupContextProvider>
      <div style={step !== 0 ? { display: "none" } : {}}>
        <StepOne setStep={setStep} />
      </div>
      <div style={step !== 1 ? { display: "none" } : {}}>
        <StepTwo setStep={setStep} />
      </div>
    </SignupContextProvider>
  );
};
