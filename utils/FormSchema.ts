import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import { SignFormTypes, LoginFormTypes } from "./GlobalTypes";

const phonePatter =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const passwordOpt = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 5,
};

const emailJoi = Joi.string()
  .email({ tlds: { allow: false } })
  .lowercase()
  .trim()
  .required();

const phoneJoi = Joi.string().regex(RegExp(phonePatter)).required();
export const SignupSchema = Joi.object<SignFormTypes>({
  phoneEmail: Joi.alternatives().try(emailJoi, phoneJoi).required().messages({
    "alternatives.match": "This field should be either a phone number or email",
  }),

  fullName: Joi.string()

    .min(6)
    .max(30)
    .trim()
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
    .trim()
    .required()
    .messages({
      "string.min": "'Username' should be more than 6 characters",
      "string.max": "'Username' should be less than 30 characters",
      "string.empty": "'Username' should not be empty",
      "string.pattern.base": "this is not a valid username",
    }),
  password: passwordComplexity(passwordOpt),
});

export const LoginSchema = Joi.object<LoginFormTypes>({
  userNamephoneEmail: Joi.alternatives()
    .try(
      Joi.string()
        .email({ tlds: { allow: false } })
        .trim()
        .lowercase(),
      Joi.string().regex(RegExp(phonePatter)),
      Joi.string()
        .trim()
        .regex(RegExp(/^(?=[a-zA-Z0-9._]{0,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/))
        .min(6)
        .max(20)
    )
    .required()
    .messages({
      "alternatives.match": "Field should be email, phone number or username",
    }),
  password: Joi.string().max(250).required().messages({
    "string.empty": "Password field should not be empty",
    "string.max": "Password field should be less than 250 characters",
  }),
});