import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import EmailFormat from "@/constants/EmailFormat";

import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import useToggle from "@/hooks/useToggle";
import AppleLogo from "@/components/AppIcons/AppleLogo";
import SmallTick from "@/components/AppIcons/SmallTick";
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import InputWithIcon from "@/components/ui/InputWithIcon";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import NeutralCircle from "@/components/AppIcons/NeutralCircle";
import { SignupFormModel } from "@/models/form/SignupFormModel";
import SmallAlertExclamation from "@/components/AppIcons/SmallAlertExclamation";

const SignupForm = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pageContent = {
    signupTitle: t("pages.signup.signupForm.signupTitle"),
    alreadyHaveAnAccount: t("pages.signup.signupForm.alreadyHaveAnAccount"),
    signIn: t("pages.signup.signupForm.signIn"),
    signUpViaEmail: t("pages.signup.signupForm.signUpViaEmail"),
    firstName: t("pages.signup.signupForm.form.firstName"),
    lastName: t("pages.signup.signupForm.form.lastName"),
    email: t("pages.signup.signupForm.form.email"),
    phoneNumber: t("pages.signup.signupForm.form.phoneNumber"),
    createPassword: t("pages.signup.signupForm.form.createPassword"),
    show: t("pages.signup.signupForm.form.show"),
    hide: t("pages.signup.signupForm.form.hide"),
    required: t("pages.signup.signupForm.form.required"),
    lowercase: t("pages.signup.signupForm.form.lowercase"),
    numbers: t("pages.signup.signupForm.form.numbers"),
    uppercase: t("pages.signup.signupForm.form.uppercase"),
    minimumCharacters: t("pages.signup.signupForm.form.minimumCharacters"),
    checkbox1Label: t("pages.signup.signupForm.form.checkbox1Label"),
    checkbox2Label: t("pages.signup.signupForm.form.checkbox2Label"),
    signUp: t("pages.signup.signupForm.form.signUp"),
  };

  const formValidationSchema: ObjectSchema<SignupFormModel> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired")
        .matches(
          EmailFormat,
          "pages.signup.signupForm.form.errors.invalidEmail",
        ),
      bestAbilityAcknowledgement: yup
        .boolean()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      firstName: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      lastName: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      password: yup
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
        ),
      personalInformationCollectionAgreement: yup
        .boolean()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      phoneNumber: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormModel>({
    defaultValues: {
      email: "",
      bestAbilityAcknowledgement: false,
      firstName: "",
      lastName: "",
      password: "",
      personalInformationCollectionAgreement: false,
      phoneNumber: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema),
  });
  const formDisabled =
    Object.entries(errors).length > 0 ||
    Object.values(watch()).some((value) => !value);

  const onFormSubmit = useCallback(() => {
    navigate(ROUTES.STEPPER_FORM.BASE);
  }, [navigate]);

  const onAuthClick = useCallback(() => {
    navigate(ROUTES.IDENTITY_CONFIRM);
  }, [navigate]);

  return (
    <div className="px-8 py-9">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <h2 className="font-segoe text-3xl font-semibold text-primary">
          {pageContent.signupTitle}
        </h2>
        <p>
          {pageContent.alreadyHaveAnAccount}{" "}
          <Link
            to={ROUTES.SIGNUP}
            className="text-base text-secondary underline"
          >
            {pageContent.signIn}
          </Link>
        </p>
      </div>

      <div className="flex w-full gap-x-4 pt-4 lg:mt-7">
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Apple Logo</span>
          <AppleLogo className="mx-auto" />
        </Button>
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Google Logo</span>
          <GoogleLogo className="mx-auto" />
        </Button>
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Microsoft Logo</span>
          <MicrosoftLogo className="mx-auto" />
        </Button>
      </div>

      <div
        className={cn(
          "flex items-center py-4 font-bold opacity-55",
          "before:mr-4 before:flex-1 before:bg-primary-300 before:p-px before:content-['']",
          "after:ml-4 after:flex-1 after:bg-primary-300 after:p-px after:content-['']",
        )}
      >
        {pageContent.signUpViaEmail}
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        data-testid="signup-form"
        className="space-y-4"
      >
        <div className={cn("form-group", { "has-error": errors.firstName })}>
          <label htmlFor="firstName" className="form-label">
            {pageContent.firstName}
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            className="input w-full py-5"
            placeholder={pageContent.required}
            type="text"
          />
          {errors.firstName?.message && (
            <span className="error-warning">{t(errors.firstName.message)}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.lastName })}>
          <label htmlFor="lastName" className="form-label">
            {pageContent.lastName}
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            className="input w-full py-5"
            placeholder={pageContent.required}
            type="text"
          />
          {errors.lastName?.message && (
            <span className="error-warning">{t(errors.lastName.message)}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.email })}>
          <label htmlFor="email" className="form-label">
            {pageContent.email}
          </label>
          <input
            {...register("email")}
            id="email"
            className="input w-full py-5"
            placeholder={pageContent.required}
            type="email"
          />
          {errors.email?.message && (
            <span className="error-warning">{t(errors.email.message)}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.phoneNumber })}>
          <label htmlFor="phoneNumber" className="form-label">
            {pageContent.phoneNumber}
          </label>
          <InputMask
            mask="___________"
            replacement={{ _: /\d/ }}
            {...register("phoneNumber")}
            id="phoneNumber"
            placeholder={pageContent.required}
            className="input w-full py-5"
            type="tel"
          />
          {errors.phoneNumber?.message && (
            <span className="error-warning">
              {t(errors.phoneNumber.message)}
            </span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.password })}>
          <label htmlFor="password" className="form-label">
            {pageContent.createPassword}
          </label>
          <InputWithIcon
            icon={
              <span
                className="cursor-pointer select-none font-bold text-primary-700"
                onClick={toggleShowPassword}
              >
                {showPassword ? pageContent.hide : pageContent.show}
              </span>
            }
            iconPosition={IconPosition.RIGHT}
            {...register("password")}
            id="password"
            className="input w-full py-5"
            placeholder={pageContent.required}
            type={showPassword ? "text" : "password"}
          />
          {errors.password?.message && (
            <span className="error-warning">{t(errors.password.message)}</span>
          )}
        </div>

        <div className="!mb-6 !mt-2 flex flex-col gap-y-2">
          <div className="flex items-center gap-x-16 lg:gap-x-20">
            <div className="flex w-28 items-center gap-x-2 lg:w-auto ">
              <div>
                {errors.password?.message &&
                !/[a-z]+/.test(watch("password")) ? (
                  <SmallAlertExclamation />
                ) : /[a-z]+/.test(watch("password")) ? (
                  <SmallTick />
                ) : (
                  <NeutralCircle />
                )}
              </div>
              <p
                className={cn("", {
                  "text-red-500":
                    errors.password && !/[a-z]+/.test(watch("password")),
                })}
              >
                {pageContent.lowercase}
              </p>
            </div>

            <div className="flex w-28 items-center gap-x-2 lg:w-auto">
              <div>
                {errors.password && !/[0-9]+/.test(watch("password")) ? (
                  <SmallAlertExclamation />
                ) : /[0-9]+/.test(watch("password")) ? (
                  <SmallTick />
                ) : (
                  <NeutralCircle />
                )}
              </div>
              <p
                className={cn("", {
                  "text-red-500":
                    errors.password && !/[0-9]+/.test(watch("password")),
                })}
              >
                {pageContent.numbers}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-16 lg:gap-x-20">
            <div className="flex w-28 items-center gap-x-2 lg:w-auto">
              <div>
                {errors.password && !/[A-Z]+/.test(watch("password")) ? (
                  <SmallAlertExclamation />
                ) : /[A-Z]+/.test(watch("password")) ? (
                  <SmallTick />
                ) : (
                  <NeutralCircle />
                )}
              </div>
              <p
                className={cn("", {
                  "text-red-500":
                    errors.password && !/[A-Z]+/.test(watch("password")),
                })}
              >
                {pageContent.uppercase}
              </p>
            </div>
            <div className="flex w-28 items-center gap-x-2 lg:w-auto">
              <div>
                {errors.password && watch("password").length < 8 ? (
                  <SmallAlertExclamation />
                ) : watch("password").length >= 8 ? (
                  <SmallTick />
                ) : (
                  <NeutralCircle />
                )}
              </div>
              <p
                className={cn("", {
                  "text-red-500":
                    errors.password && watch("password").length < 8,
                })}
              >
                {pageContent.minimumCharacters}
              </p>
            </div>
          </div>
        </div>

        <div className="form-radio-checkbox-group !items-start">
          <div className="flex items-center justify-center">
            <Checkbox
              {...register("bestAbilityAcknowledgement")}
              id="bestAbilityAcknowledgement"
              type="checkbox"
            />
          </div>
          <label
            htmlFor="bestAbilityAcknowledgement"
            className="border-primary-300 text-black"
          >
            {pageContent.checkbox1Label}
          </label>
        </div>

        <div className={cn(`ml-auto h-1 border-t border-primary-300`)} />

        <div className="form-radio-checkbox-group !items-start">
          <div className="flex items-center justify-center">
            <Checkbox
              {...register("personalInformationCollectionAgreement")}
              id="personalInformationCollectionAgreement"
              type="checkbox"
            />
          </div>
          <label
            htmlFor="personalInformationCollectionAgreement"
            className="border-primary-300 text-black"
          >
            {pageContent.checkbox2Label}
          </label>
        </div>

        <Button
          disabled={formDisabled}
          className="!mt-8 w-full rounded-md text-xl"
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          {pageContent.signUp}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
