import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Logo from "../../public/logoText.svg";

import { FormContainer, WideButton, OrLine, Input } from "./";

import { SignupStepOneTypes } from "../../utils/GlobalTypes";
import { SignupStepOneSchema } from "../../utils/FormSchema";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type StepOneType = {
  setStep: Dispatch<SetStateAction<number>>;
  setStepOneData: Dispatch<SetStateAction<SignupStepOneTypes>>;
};
const formNamesText = [
  { name: "phoneEmail", text: "Phone number or email" },
  { name: "fullName", text: "Full Name" },
  { name: "userName", text: "Username" },
  { name: "password", text: "password" },
];

export const StepOne = ({ setStep, setStepOneData }: StepOneType) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupStepOneTypes>({
    resolver: joiResolver(SignupStepOneSchema),
    mode: "onChange",
  });

  return (
    <FormContainer>
      <Logo />
      <div
        style={{
          fontSize: "1.8rem",
          color: "var(--txt-c-2)",
          textAlign: "center",
          margin: "1rem 0",
          fontWeight: "500",
        }}
      >
        Sign up to see photos and videos from your friends.
      </div>
      <WideButton
        hasIcon={true}
        onClick={() => {
          signIn("google");
        }}
      >
        Log in With Google
      </WideButton>
      <OrLine />
      <form
        method="post"
        autoComplete="off"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          setStepOneData(data);
          setStep((curr) => curr + 1);
          // fetch
          //   if (step === 0) {
          //     console.log("from here state");
          //     return;
          //   }
          //   console.log("from here");
          //   const rawResponse = await fetch("/api/users/user", {
          //     method: "POST",
          //     headers: {
          //       Accept: "application/json",
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(data),
          //   });
          //   const content = await rawResponse.json();

          //   console.log(content);
        })}
      >
        {/* <div style={step===0 ? { width: "100%" }}> */}
        <div>
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
            People who use our service may have uploaded your contact
            information to Instagram.
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
        </div>

        <WideButton hasIcon={false} disabled={!isValid} type="submit">
          Sign up
        </WideButton>
      </form>
    </FormContainer>
  );
};
