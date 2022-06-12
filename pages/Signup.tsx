import Input from "../components/Form/Input";
import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/Form/SignInUpContainer";
const Signup = () => {
  return (
    <SignInUpContainer>
      <WideButton hasIcon={true}>Log in With Google</WideButton>
      <OrLine />
      <form>
        <Input name="phoneEmail" placeholder="Phone number or email" />
        <Input name="fullName" placeholder="Full Name" />
        <Input name="username" placeholder="Username" />
        <Input name="Password" placeholder="Passwonrd" />
        <WideButton hasIcon={false}>Sign up</WideButton>
      </form>
    </SignInUpContainer>
  );
};

export default Signup;
