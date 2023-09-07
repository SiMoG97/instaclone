import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

import Logo from "../public/logoText.svg";
import {
  FormContainer,
  WideButton,
  Input,
  OrLine,
} from "../components/AuthComponents";

import { LoginFormTypes } from "../utils/GlobalTypes";
import { LoginSchema } from "../utils/FormSchema";

const formNamesText = [
  { name: "userNamephoneEmail", text: "Phone number, username, or email" },
  { name: "password", text: "password" },
];

const Login = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      // redirect to the return url or home page
      // router.push((router.query.returnUrl as string) || "/");
    }
  }, [session, isRedirecting, router]);

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
    <FormContainer>
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
      <WideButton
        hasIcon={true}
        onClick={() => {
          signIn("google");
        }}
      >
        Log in with Google
      </WideButton>
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
    </FormContainer>
  );
};

export default Login;
