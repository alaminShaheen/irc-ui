import { useCallback } from "react";
import useToggle from "@/hooks/useToggle";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ObjectSchema } from "yup";
import EmailFormat from "@/constants/EmailFormat";
import { SignInFormModel } from "@/models/form/SignInFormModel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import AppleLogo from "@/components/AppIcons/AppleLogo";
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import { cn } from "@/utils/helper";
import InputWithIcon from "@/components/ui/InputWithIcon";

const SingInForm = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formValidationSchema: ObjectSchema<SignInFormModel> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired")
        .matches(
          EmailFormat,
          "pages.signup.signupForm.form.errors.invalidEmail",
        ),
      password: yup
        .string()
        .required("pages.signup.signupForm.form.errors.fieldRequired"),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormModel>({
    defaultValues: {
      email: "",
      password: "",
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
    <div className="mx-auto flex w-[440px] flex-col items-center px-8 py-9">
      <div className="flex w-full flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <h2 className="w-full text-center font-segoe text-3xl font-semibold text-primary">
          Sign in
        </h2>
      </div>

      <div className="flex w-full gap-x-2 lg:mt-7">
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Apple Logo</span>
          <AppleLogo className="mx-auto" />
        </Button>
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Google Logo</span>
          <GoogleLogo className="mx-auto" />
        </Button>
        <Button
          onClick={onAuthClick}
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2"
          variant={ButtonVariant.VANILLA}
        >
          <span className="sr-only">Microsoft Logo</span>
          <MicrosoftLogo className="mx-auto" />
        </Button>
      </div>

      <div
        className={cn(
          "mt-4 flex w-full items-center py-4 font-bold opacity-55",
          "before:mr-4 before:flex-1 before:bg-primary-300 before:p-px before:content-['']",
          "after:ml-4 after:flex-1 after:bg-primary-300 after:p-px after:content-['']",
        )}
      >
        Or sign in via email
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        data-testid="signup-form"
        className="mt-12 w-full space-y-4"
      >
        <div className={cn("form-group", { "has-error": errors.email })}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            className="input w-full py-5"
            placeholder="Enter email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email?.message && (
            <span className="error-warning" id="email-error">
              {t(errors.email.message)}
            </span>
          )}
        </div>

        <div className={cn("form-group", { "has-error": errors.password })}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <InputWithIcon
            icon={
              <span
                className="cursor-pointer select-none font-bold text-primary-700"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            }
            iconPosition={IconPosition.RIGHT}
            {...register("password")}
            id="password"
            className="input w-full py-5"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password?.message && (
            <span className="error-warning" id="password-error">
              {t(errors.password.message)}
            </span>
          )}
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Link to={ROUTES.SIGNUP} className="font-bold text-primary underline">
            Forgot your password
          </Link>
        </div>

        <Button
          disabled={formDisabled}
          className="!mt-6 w-full rounded-md text-xl"
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          Login
        </Button>
        <p className="mt-4 text-center text-xl text-black/50">
          Don't have an account?{" "}
          <span className="cursor-pointer text-base text-primary">Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default SingInForm;
