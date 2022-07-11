import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Input from "../components/SignInUpContainer/Input";
import Button from "../components/Button";
import Logo from "../public/logoText.svg";

import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/SignInUpContainer";

import { SignFormTypes } from "../utils/GlobalTypes";
import { SignupSchema } from "../utils/FormSchema";
import { useState } from "react";
import Image from "next/image";
import BirthdaySection from "../components/SignInUpContainer/BirthdaySection";

const formNamesText = [
  { name: "phoneEmail", text: "Phone number or email" },
  { name: "fullName", text: "Full Name" },
  { name: "userName", text: "Username" },
  { name: "password", text: "password" },
];

const Signup = () => {
  const [step, setStep] = useState(1);
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
      {step === 0 && (
        <>
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
          <WideButton hasIcon={true}>Log in With Google</WideButton>
          <OrLine />
        </>
      )}
      <form
        autoComplete="off"
        onSubmit={handleSubmit(async (data) => {
          // console.log(data);
          // fetch
          if (step === 0) {
            setStep((curr) => curr + 1);
            console.log("from here state");
            return;
          }
          console.log("from here");
          const rawResponse = await fetch("/api/users/user", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const content = await rawResponse.json();

          console.log(content);
        })}
      >
        {/* <div style={step===0 ? { width: "100%" }}> */}
        <div style={step !== 0 ? { display: "none" } : {}}>
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
        <div
          style={
            step === 1
              ? {
                  width: "100%",
                  textAlign: "center",
                  color: "var(--txt-c-1)",
                }
              : { display: "none" }
          }
        >
          <BirthdaySection />
        </div>
        <WideButton
          hasIcon={false}
          disabled={!isValid}
          type={step === 0 ? "button" : "submit"}
        >
          {step === 0 ? "Sign up" : "Next"}
        </WideButton>
        {step === 1 && (
          <div style={{ textAlign: "center" }}>
            <Button
              mainShape={false}
              mainColor={false}
              bold={true}
              style={{ marginTop: "1rem" }}
              onClick={() => {
                setStep((curr) => curr - 1);
              }}
            >
              Go back
            </Button>
          </div>
        )}
      </form>
    </SignInUpContainer>
  );
};

export default Signup;
