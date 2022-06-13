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
        <p
          style={{
            color: "var(--txt-c-2)",
            fontSize: "1.2rem",
            textAlign: "center",
            margin: "2rem 0",
          }}
        >
          People who use our service may have uploaded your contact information
          to Instagram.
          <strong>
            <a href="/" target="_blank">
              {" "}
              Learn More
            </a>
          </strong>
          <br />
          <br />
          By signing up, you agree to our
          <strong>
            <a href="/" target="_blank">
              Terms
            </a>
            ,
            <a href="/" target="_blank">
              Data Policy
            </a>{" "}
            and
            <a href="/" target="_blank">
              Cookies Policy
            </a>{" "}
            .
          </strong>
        </p>
        <WideButton hasIcon={false}>Sign up</WideButton>
      </form>
    </SignInUpContainer>
  );
};

export default Signup;
