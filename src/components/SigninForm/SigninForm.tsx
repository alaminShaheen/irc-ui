import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";

import { ButtonVariant, ButtonType } from "@/models/enums/ButtonVariant";
import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import AppleLogo from "@/components/AppIcons/AppleLogo";
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import { SigninFormModel } from "@/models/form/SigninFormModel";
import Email from "@/components/FormElements/Email";
import Password from "@/components/FormElements/Password";
import { emailValidationSchema } from "../FormElements/ValidationSchemas";

const SigninForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pageContent = {
    signupTitle: t("pages.signin.signinForm.signinTitle"),
    signIn: t("pages.signin.signinForm.signIn"),
    signInViaEmail: t("pages.signin.signinForm.signInViaEmail"),
    email: t("pages.signin.signinForm.form.email"),
    password: t("pages.signin.signinForm.form.password"),
    show: t("pages.signin.signinForm.form.show"),
    hide: t("pages.signin.signinForm.form.hide"),
    required: t("pages.signin.signinForm.form.required"),
    forgetYourPassword: t("pages.signin.signinForm.form.forgetYourPassword"),
    enterEmail: t("pages.signin.signinForm.form.enterEmail"),
    logIn: t("pages.signin.signinForm.form.logIn"),
    dontHaveAnAccount: t("pages.signin.signinForm.dontHaveAnAccount"),
    signUp: t("pages.signin.signinForm.form.signUp"),
  };

  const formValidationSchema: ObjectSchema<SigninFormModel> = yup
    .object()
    .shape({
      email: emailValidationSchema,
      password: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
    });

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema),
  });

  const {
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

  return (
    <div className="mb-[100px] mt-8 flex flex-col gap-y-4">
      <h1 className="text-center font-segoe text-3xl font-semibold text-primary">
        {pageContent.signIn}
      </h1>

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
        {pageContent.signInViaEmail}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          data-testid="signin-form"
          className="space-y-4"
        >
          <Email
            label={pageContent.email}
            placeholderContent={pageContent.enterEmail}
          />

          <Password
            label={pageContent.password}
            placeholderContent={pageContent.required}
            showPasswordContent={pageContent.show}
            hidePasswordContent={pageContent.hide}
          />

          <Link
            to={ROUTES.FORGET_PASSWORD}
            className="!mt-2 flex justify-end text-base font-bold text-primary-700 underline decoration-1 underline-offset-1"
          >
            {pageContent.forgetYourPassword}
          </Link>

          <Button
            disabled={formDisabled}
            className="!mt-6 w-full rounded-md text-xl font-bold"
            variant={
              formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
            }
            type={ButtonType.SUBMIT}
          >
            {pageContent.logIn}
          </Button>
        </form>
      </FormProvider>
      <p className="text-center text-lg">
        {pageContent.dontHaveAnAccount}{" "}
        <Link
          to={ROUTES.SIGNUP}
          className="text-base font-bold text-primary-700 underline decoration-1 underline-offset-1 !opacity-100"
        >
          {pageContent.signUp}
        </Link>
      </p>
    </div>
  );
};

export default SigninForm;
