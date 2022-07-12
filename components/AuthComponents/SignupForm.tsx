import { useState } from "react";

import SignupContextProvider from "../../context/SignupContext";
import { StepOne, StepTwo } from "./";

export const SignupForm = () => {
  const [step, setStep] = useState(1);

  return (
    <SignupContextProvider>
      {step === 0 && <StepOne setStep={setStep} />}
      {step === 1 && <StepTwo setStep={setStep} />}
    </SignupContextProvider>
  );
};
