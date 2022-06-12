import Input from "../components/Form/Input";
import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/Form/SignInUpContainer";
const Login = () => {
  return (
    <SignInUpContainer>
      <Input
        name="userNameEmailPhone"
        placeholder="Phone number, username, or email"
      />
      <Input name="password" placeholder="Password" />
      <WideButton hasIcon={false}>Log in</WideButton>
      <OrLine />
      <WideButton hasIcon={true}>Log in with Google</WideButton>
      <div
        style={{
          color: "var(--txt-c-2)",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginTop: "2rem",
        }}
      >
        Forget password ?
      </div>
    </SignInUpContainer>
  );
};

export default Login;
