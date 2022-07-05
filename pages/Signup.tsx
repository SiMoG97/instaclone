import { useForm } from "react-hook-form";

import Input from "../components/SignInUpContainer/Input";
import Footer from "../components/Footer";
import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/SignInUpContainer";
import { SignFormTypes } from "../utils/GlobalTypes";

const Signup = () => {
  const { register, handleSubmit } = useForm<SignFormTypes>();

  return (
    <SignInUpContainer>
      <WideButton hasIcon={true}>Log in With Google</WideButton>
      <OrLine />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Input
          {...register("phoneEmail")}
          text="Phone number or email"
          name="phoneEmail"
        />
        <Input {...register("fullName")} text="Full Name" name="fullName" />
        <Input {...register("userName")} text="Username" name="userName" />
        <Input
          {...register("password")}
          type="password"
          text="Passwonrd"
          name="password"
        />

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
