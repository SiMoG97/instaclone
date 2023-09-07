import { SignupForm } from "../components/AuthComponents";
import { useRedirectLoginSignup } from "../Hooks/useRedirectLoginSignup";

const Signup = () => {
  useRedirectLoginSignup();

  return (
    <>
      <SignupForm />
    </>
  );
};

export default Signup;
