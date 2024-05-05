import * as yup from "yup";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import Email from "@/components/FormElements/Email";
import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import FormError from "@/components/FormError";
import Password from "@/components/FormElements/Password";
import AppleLogo from "@/components/AppIcons/AppleLogo";
import SmallTick from "@/components/AppIcons/SmallTick";
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import PhoneNumber from "@/components/FormElements/PhoneNumber";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import NeutralCircle from "@/components/AppIcons/NeutralCircle";
import { SignupFormModel } from "@/models/form/SignupFormModel";
import SmallAlertExclamation from "@/components/AppIcons/SmallAlertExclamation";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import {
  emailValidationSchema,
  passwordValidationRegEx,
  passwordValidationSchema,
  phoneNumberValidationSchema,
} from "@/components/FormElements/ValidationSchemas";
import AgreementCheckboxes from "@/components/AgreementCheckboxes";

const SignupForm = () => {
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
    minimumSpecialCharacter: t(
      "pages.signup.signupForm.form.minimumSpecialCharacter",
    ),
    noEmoji: t("pages.signup.signupForm.form.noEmoji"),
    signUp: t("pages.signup.signupForm.form.signUp"),
  };

  const formValidationSchema: ObjectSchema<SignupFormModel> = yup
    .object()
    .shape({
      email: emailValidationSchema,
      bestAbilityAcknowledgement: yup
        .boolean()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      firstName: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      lastName: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      password: passwordValidationSchema,
      personalInformationCollectionAgreement: yup
        .boolean()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
      phoneNumber: phoneNumberValidationSchema,
    });

  const methods = useForm({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const formDisabled =
    Object.entries(errors).length > 0 ||
    Object.values(watch()).some((value) => !value);

  const onFormSubmit = useCallback(() => {
    navigate(ROUTES.STEPPER_FORM.BASE);
  }, [navigate]);

  const onAuthClick = useCallback(() => {
    navigate(ROUTES.IDENTITY_CONFIRM);
  }, [navigate]);

  interface PasswordValidationIndicatorProps {
    contentKey: keyof typeof passwordValidationRegEx | "minimumCharacters";
  }
  const PassWordValidationIndicator = ({
    contentKey,
  }: PasswordValidationIndicatorProps) => {
    const password = watch("password");
    const isRegexValid =
      contentKey !== "minimumCharacters" &&
      passwordValidationRegEx[contentKey]?.test(password);
    const isLengthValid =
      contentKey === "minimumCharacters" && password.length >= 8;

    return (
      <div className="flex w-28 items-center gap-x-2 lg:w-auto ">
        <div>
          {errors.password?.message && !(isRegexValid || isLengthValid) ? (
            <SmallAlertExclamation />
          ) : isRegexValid || isLengthValid ? (
            <SmallTick />
          ) : (
            <NeutralCircle />
          )}
        </div>
        <p
          className={cn("", {
            "text-red-500": errors.password && !(isRegexValid || isLengthValid),
          })}
        >
          {pageContent[contentKey]}
        </p>
      </div>
    );
  };

  return (
    <div className="px-8 py-9">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <h2 className="font-segoe text-3xl font-semibold text-primary">
          {pageContent.signupTitle}
        </h2>
        <p>
          {pageContent.alreadyHaveAnAccount}{" "}
          <Link
            to={ROUTES.SIGNIN}
            className="text-base font-bold text-secondary underline decoration-1 underline-offset-1"
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

      <FormProvider {...methods}>
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
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName?.message && (
              <FormError
                id="firstName-error"
                errorMessage={t(errors.firstName.message)}
              />
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
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName?.message && (
              <FormError
                id="lastName-error"
                errorMessage={t(errors.lastName.message)}
              />
            )}
          </div>

          <Email
            label={pageContent.email}
            placeholderContent={pageContent.required}
          />

          <PhoneNumber
            label={pageContent.phoneNumber}
            placeholderContent={pageContent.required}
          />

          <Password
            label={pageContent.createPassword}
            placeholderContent={pageContent.required}
            showPasswordContent={pageContent.show}
            hidePasswordContent={pageContent.hide}
          />

          <div className="!mb-6 !mt-2 flex flex-col gap-y-2">
            <div className="flex items-center gap-x-16 lg:gap-x-20">
              <PassWordValidationIndicator contentKey="lowercase" />
              <PassWordValidationIndicator contentKey="numbers" />
            </div>

            <div className="flex items-center gap-x-16 lg:gap-x-20">
              <PassWordValidationIndicator contentKey="uppercase" />
              <PassWordValidationIndicator contentKey="minimumCharacters" />
            </div>
            <div className="flex items-center gap-x-16 lg:gap-x-20">
              <PassWordValidationIndicator contentKey="minimumSpecialCharacter" />
            </div>
          </div>

          <AgreementCheckboxes />

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
      </FormProvider>
    </div>
  );
};

export default SignupForm;
