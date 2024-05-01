import * as yup from "yup";

export const emailValidationSchema = yup
  .string()
  .required("common.form.errors.fieldRequired")
  .matches(
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
    "common.form.errors.invalidEmail",
  );

export const passwordValidationRegEx = {
  uppercase: /[A-Z]+/,
  lowercase: /[a-z]+/,
  numbers: /[0-9]+/,
  minimumSpecialCharacter: /[\^$*.()[\]{}?"!@#%&/\\,><':;|_~`=+-]/,
};

export const passwordValidationSchema = yup
  .string()
  .required("pages.signup.signupForm.form.errors.fieldRequired")
  .min(8, "pages.signup.signupForm.form.errors.passwordMinCharacters")
  .matches(
    passwordValidationRegEx.uppercase,
    "pages.signup.signupForm.form.errors.passwordUppercaseCharacters",
  )
  .matches(
    passwordValidationRegEx.lowercase,
    "pages.signup.signupForm.form.errors.passwordLowerCharacters",
  )
  .matches(
    passwordValidationRegEx.numbers,
    "pages.signup.signupForm.form.errors.passwordNumericCharacters",
  )
  .matches(
    passwordValidationRegEx.minimumSpecialCharacter,
    "pages.signup.signupForm.form.errors.passwordMinSpecialCharacter",
  );

export const phoneNumberValidationSchema = yup
  .string()
  .required("common.form.errors.fieldRequired")
  .min(10, "common.form.errors.phoneNumberMinLength");
