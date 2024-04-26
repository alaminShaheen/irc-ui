import * as yup from "yup";

export const emailValidationSchema = yup
  .string()
  .required("common.form.errors.fieldRequired")
  .matches(
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
    "common.form.errors.invalidEmail",
  );

export const passwordValidationSchema = yup
  .string()
  .required("common.form.errors.fieldRequired")
  .min(8, "common.form.errors.passwordMinCharacters")
  .matches(/[A-Z]+/, "common.form.errors.passwordUppercaseCharacters")
  .matches(/[a-z]+/, "common.form.errors.passwordLowerCharacters")
  .matches(/[0-9]+/, "common.form.errors.passwordNumericCharacters")
  .matches(
    /^[\w^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]*$/,
    "common.form.errors.passwordInvalidCharacters",
  );

export const phoneNumberValidationSchema = yup
  .string()
  .required("common.form.errors.fieldRequired")
  .min(10, "common.form.errors.phoneNumberMinLength");
