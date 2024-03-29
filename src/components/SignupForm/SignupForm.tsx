import * as yup from "yup";
import { ObjectSchema } from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

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
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import InputWithIcon from "@/components/ui/InputWithIcon";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import { SignupFormModel } from "@/models/form/SignupFormModel";
import NeutralCircle from "@/components/AppIcons/NeutralCircle";
import SmallTick from "@/components/AppIcons/SmallTick";
import SmallAlertExclamation from "@/components/AppIcons/SmallAlertExclamation";

const SignupForm = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const formValidationSchema: ObjectSchema<SignupFormModel> = yup
    .object()
    .shape({
      email: yup.string().required("This field is required."),
      bestAbilityAcknowledgement: yup
        .boolean()
        .required("This field is required."),
      firstName: yup.string().required("This field is required."),
      lastName: yup.string().required("This field is required."),
      password: yup
        .string()
        .required("This field is required.")
        .min(8, "Password must be a minimum of 8 characters")
        .matches(
          /[A-Z]+/,
          "Password must contain at least 1 uppercase alphabet",
        )
        .matches(
          /[a-z]+/,
          "Password must contain at least 1 uppercase alphabet",
        )
        .matches(
          /[0-9]+/,
          "Password must contain at least 1 numeric character",
        ),
      personalInformationCollectionAgreement: yup
        .boolean()
        .required("This field is required."),
      phoneNumber: yup.string().required("This field is required."),
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

  const onFormSubmit = useCallback(() => {}, []);

  return (
    <div className="px-8 py-9">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <h2 className="font-segoe text-3xl font-semibold text-primary">
          Sign up
        </h2>
        <p>
          Already have an account?{" "}
          <Link
            to={ROUTES.SIGNUP}
            className="text-base text-secondary underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="flex w-full gap-x-4 pt-4 lg:mt-7">
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <AppleLogo className="mx-auto" />
        </Button>
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <GoogleLogo className="mx-auto" />
        </Button>
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <MicrosoftLogo className="mx-auto" />
        </Button>
      </div>

      <div
        className={cn(
          "flex items-center py-4",
          "before:mr-4 before:flex-1 before:bg-primary-300 before:p-px before:content-['']",
          "after:ml-4 after:flex-1 after:bg-primary-300 after:p-px after:content-['']",
        )}
      >
        Or sign up via e-mail
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        data-testid="signup-form"
        className="space-y-4"
      >
        <div className={cn("form-group", { "has-error": errors.firstName })}>
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            {...register("firstName")}
            id="firstName"
            className="input w-full py-5"
            placeholder="Required"
            type="text"
          />
          {errors.firstName?.message && (
            <span className="error-warning">{errors.firstName.message}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.lastName })}>
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            {...register("lastName")}
            id="lastName"
            className="input w-full py-5"
            placeholder="Required"
            type="text"
          />
          {errors.lastName?.message && (
            <span className="error-warning">{errors.lastName.message}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.email })}>
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            {...register("email")}
            id="email"
            className="input w-full py-5"
            placeholder="Required"
            type="email"
          />
          {errors.email?.message && (
            <span className="error-warning">{errors.email.message}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.phoneNumber })}>
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <InputMask
            mask="(999) 999-9999"
            replacement={{ 9: /\d/ }}
            {...register("phoneNumber")}
            id="phoneNumber"
            placeholder="Required"
            className="input w-full py-5"
            type="tel"
          />
          {errors.phoneNumber?.message && (
            <span className="error-warning">{errors.phoneNumber.message}</span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.password })}>
          <label htmlFor="password" className="form-label">
            Create password:
          </label>
          <InputWithIcon
            icon={
              <span
                className="cursor-pointer select-none text-primary"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            }
            iconPosition={IconPosition.RIGHT}
            {...register("password")}
            id="password"
            className="input w-full py-5"
            placeholder="Required"
            type={showPassword ? "text" : "password"}
          />
          {errors.password?.message && (
            <span className="error-warning">{errors.password.message}</span>
          )}
        </div>

        <div className="!mb-6 flex gap-x-10">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              {errors.password?.message && !/[a-z]+/.test(watch("password")) ? (
                <SmallAlertExclamation />
              ) : /[a-z]+/.test(watch("password")) ? (
                <SmallTick />
              ) : (
                <NeutralCircle />
              )}
              <p>Lowercase</p>
            </div>

            <div className="flex items-center gap-x-2">
              {errors.password && !/[A-Z]+/.test(watch("password")) ? (
                <SmallAlertExclamation />
              ) : /[A-Z]+/.test(watch("password")) ? (
                <SmallTick />
              ) : (
                <NeutralCircle />
              )}
              <p>Uppercase</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              {errors.password && !/[0-9]+/.test(watch("password")) ? (
                <SmallAlertExclamation />
              ) : /[0-9]+/.test(watch("password")) ? (
                <SmallTick />
              ) : (
                <NeutralCircle />
              )}
              <p>Numbers</p>
            </div>
            <div className="flex items-center gap-x-2">
              {errors.password && watch("password").length < 8 ? (
                <SmallAlertExclamation />
              ) : watch("password").length >= 8 ? (
                <SmallTick />
              ) : (
                <NeutralCircle />
              )}
              <p>Minimum 8 characters</p>
            </div>
          </div>
        </div>

        <div className="form-radio-checkbox-group">
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
            I understand the above and acknowledge that I will answer all
            questions to the best of my ability at the time of completing this
            application.
          </label>
        </div>

        <div className={cn(`ml-auto h-1 border-t border-primary-300`)} />

        <div className="form-radio-checkbox-group">
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
            I understand and agree that the personal information collected
            through this purchasing process will be shared with the Insurance
            Broker, Insurance Underwriters, in the event of a claim Third Party
            Claims Adjusters, and other companies or individuals required to
            service your insurance requirements and needs. Additionally, I have
            read and agree to the Privacy Policy contained in your portal.
          </label>
        </div>

        <Button
          className="!mt-8 w-full rounded-md"
          variant={ButtonVariant.PRIMARY}
          type={ButtonType.SUBMIT}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
