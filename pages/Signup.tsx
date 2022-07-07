import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Input from "../components/SignInUpContainer/Input";
import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/SignInUpContainer";

import { SignFormTypes } from "../utils/GlobalTypes";
import { SignupSchema } from "../utils/FormSchema";

const formNamesText = [
  { name: "phoneEmail", text: "Phone number or email" },
  { name: "fullName", text: "Full Name" },
  { name: "userName", text: "Username" },
  { name: "password", text: "password" },
];

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignFormTypes>({
    resolver: joiResolver(SignupSchema),
    mode: "onChange",
  });
  return (
    <SignInUpContainer>
      <WideButton hasIcon={true}>Log in With Google</WideButton>
      <OrLine />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {formNamesText.map(({ name, text }) => {
          if (
            name === "phoneEmail" ||
            name === "fullName" ||
            name === "userName" ||
            name === "password"
          ) {
            let passProps = {};
            if (name === "password") {
              passProps = {
                type: "password",
                hasValue:
                  watch("password") === undefined
                    ? false
                    : watch("password") !== "",
              };
            }
            return (
              <Input
                key={name}
                {...register(name)}
                text={text}
                name={name}
                error={errors[name]}
                {...passProps}
              />
            );
          }
        })}
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
        <WideButton hasIcon={false} disabled={!isValid}>
          Sign up
        </WideButton>
      </form>
    </SignInUpContainer>
  );
};

export default Signup;
