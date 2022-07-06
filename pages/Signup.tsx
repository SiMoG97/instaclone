import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
// const Cjoi = Joi.extend(require("joi-phone-number"));

import Input from "../components/SignInUpContainer/Input";
// import Footer from "../components/Footer";
import SignInUpContainer, {
  OrLine,
  WideButton,
} from "../components/SignInUpContainer";
import { SignFormTypes } from "../utils/GlobalTypes";

const phonePatter =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
const formSchema = Joi.object<SignFormTypes>({
  phoneEmail: Joi.alternatives()
    .try(
      Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      Joi.string().regex(RegExp(phonePatter)).required()
    )
    .required()
    .messages({
      "alternatives.match":
        "This field should be either a phone number or email",
    }),

  fullName: Joi.string()

    .min(6)
    .max(30)
    .required()
    .messages({
      "string.min": "'Full name' should be more than 6 letters",
      "string.max": "'Full name' should be less than 30 letters",
      "string.empty": "'Full name' should not be empty",
    }),
  userName: Joi.string()
    .regex(RegExp(/^(?=[a-zA-Z0-9._]{0,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/))
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.min": "'Username' should be more than 6 characters",
      "string.max": "'Username' should be less than 30 characters",
      "string.empty": "'Username' should not be empty",
      "string.pattern.base": "this is not a valid username",
    }),
  password: Joi.string().min(8).max(64).required().messages({
    "string.min": "'Password' should be more than 8 characters",
    "string.max": "'Password' should be less than 64 characters ",
    "string.empty": "'Password' should not be empty",
  }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignFormTypes>({
    resolver: joiResolver(formSchema),
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
        <Input
          {...register("phoneEmail")}
          text="Phone number or email"
          name="phoneEmail"
          error={errors.phoneEmail}
        />

        <Input
          {...register("fullName")}
          text="Full Name"
          name="fullName"
          error={errors.fullName}
        />
        <Input
          {...register("userName")}
          text="Username"
          name="userName"
          error={errors.userName}
        />
        <Input
          {...register("password")}
          type="password"
          text="Passwonrd"
          name="password"
          error={errors.password}
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
