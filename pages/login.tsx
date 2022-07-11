import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Input from "../components/SignInUpContainer/Input";
import Logo from "../public/logoText.svg";

import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/SignInUpContainer";

import { LoginFormTypes } from "../utils/GlobalTypes";
import { LoginSchema } from "../utils/FormSchema";

const formNamesText = [
  { name: "userNamephoneEmail", text: "Phone number, username, or email" },
  { name: "password", text: "password" },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormTypes>({
    resolver: joiResolver(LoginSchema),
    mode: "onChange",
  });
  return (
    <SignInUpContainer>
      <Logo style={{ marginBottom: "3rem" }} />

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {formNamesText.map(({ name, text }) => {
          if (name === "userNamephoneEmail" || name === "password") {
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
        <WideButton hasIcon={false} disabled={!isValid}>
          Log in
        </WideButton>
      </form>
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
