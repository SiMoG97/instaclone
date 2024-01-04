import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
// import { getSession } from "next-auth/react"
import {
  signIn,
  useSession,
  getSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  GetSessionParams,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

import Logo from "../public/logoText.svg";
import {
  FormContainer,
  WideButton,
  Input,
  OrLine,
} from "../components/AuthComponents";

import { LoginFormTypes } from "../utils/GlobalTypes";
import { LoginSchema } from "../utils/FormSchema";
import { useRedirectLoginSignup } from "../Hooks/useRedirectLoginSignup";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { redirect } from "next/navigation";

const formNamesText = [
  { name: "userNamephoneEmail", text: "Phone number, username, or email" },
  { name: "password", text: "password" },
];

// { session }: { session: Session | null }
// const Login = ({ name, title }: { title: string; name: string }) => {
const Login = ({ callbackUrl }: { callbackUrl: string }) => {
  console.log(callbackUrl);
  // const router = useRouter();
  // const { data: session } = useSession();

  // if (!session){

  // }
  // useRedirectLoginSignup();
  // console.log(session);
  // if (!session) {
  //   // redirect("/");
  // }

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
        <WideButton
          onClick={() => {
            signIn("google", {
              callbackUrl,
            });
          }}
          hasIcon={false}
          disabled={!isValid}
        >
          Log in
        </WideButton>
      </form>
      <OrLine />
      <WideButton
        hasIcon={true}
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: context.query.prevAsPath || "/",
        permanente: false,
      },
    };
  }
  return {
    props: {
      callbackUrl: `${process.env.NEXTAUTH_URL}${
        context.query.prevAsPath || "/"
      }`,
    },
  };
}

export default Login;