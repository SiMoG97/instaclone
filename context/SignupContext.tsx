import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SignupStepOneTypes, SignupStepTwoTypes } from "../utils/GlobalTypes";

type ContextType = {
  stepOneData: SignupStepOneTypes;
  stepTwoData: SignupStepTwoTypes;
  setStepOneData: Dispatch<SetStateAction<SignupStepOneTypes>>;
  setStepTwoData: Dispatch<SetStateAction<SignupStepTwoTypes>>;
};

const SignupContext = createContext({} as ContextType);

export default function SignupContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stepOneData, setStepOneData] = useState<SignupStepOneTypes>(
    {} as SignupStepOneTypes
  );
  const [stepTwoData, setStepTwoData] = useState<SignupStepTwoTypes>(
    {} as SignupStepTwoTypes
  );
  return (
    <SignupContext.Provider
      value={{ stepOneData, setStepOneData, stepTwoData, setStepTwoData }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export const useSignupContext = () => useContext(SignupContext);
