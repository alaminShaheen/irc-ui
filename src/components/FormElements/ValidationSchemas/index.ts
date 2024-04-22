import * as yup from "yup";

export const emailValidationSchema = yup
  .string()
  .required("pages.signup.signupForm.form.errors.fieldRequired")
  .matches(
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
    "pages.signup.signupForm.form.errors.invalidEmail",
  );

export const passwordValidationSchema = yup
  .string()
  .required("pages.signup.signupForm.form.errors.fieldRequired")
  .min(8, "pages.signup.signupForm.form.errors.passwordMinCharacters")
  .matches(
    /[A-Z]+/,
    "pages.signup.signupForm.form.errors.passwordUppercaseCharacters",
  )
  .matches(
    /[a-z]+/,
    "pages.signup.signupForm.form.errors.passwordLowerCharacters",
  )
  .matches(
    /[0-9]+/,
    "pages.signup.signupForm.form.errors.passwordNumericCharacters",
  )
  .matches(
    /^[\w^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]*$/,
    "pages.signup.signupForm.form.errors.passwordInvalidCharacters",
  );

export const phoneNumberValidation = yup
  .string()
  .required("pages.signup.signupForm.form.errors.fieldRequired")
  .min(10, "pages.signup.signupForm.form.errors.phoneNumberMinLength");
