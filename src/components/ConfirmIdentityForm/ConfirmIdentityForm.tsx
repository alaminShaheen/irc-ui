import * as yup from "yup";
import { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trans, useTranslation } from "react-i18next";

import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import EmailFormat from "@/constants/EmailFormat";
import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
import { ConfirmIdentityFormModel } from "@/models/form/ConfirmIdentityFormModel";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import ExternalLink from "@/components/AppIcons/ExternalLink";

const ConfirmIdentityForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pageContent = {
    allFieldsRequired: t("pages.confirmIdentity.form.allFieldsRequired"),
    firstName: t("pages.confirmIdentity.form.firstName"),
    lastName: t("pages.confirmIdentity.form.lastName"),
    email: t("pages.confirmIdentity.form.email"),
    phoneNumber: t("pages.confirmIdentity.form.phoneNumber"),
    identityInfo: t("pages.confirmIdentity.form.identityInfo"),
    emailInfo: t("pages.confirmIdentity.form.emailInfo"),
    phoneNumberInfo: t("pages.confirmIdentity.form.phoneNumberInfo"),
    checkbox1Label: (
      <Trans i18nKey="pages.confirmIdentity.form.checkbox1Label">
        I understand and agree to the use of
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          application agreement
          <ExternalLink className=""></ExternalLink>
        </a>
      </Trans>
    ),
    checkbox2Label: (
      <Trans i18nKey="pages.confirmIdentity.form.checkbox2Label">
        I understand and agree the information submitted will be used in line
        with our
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          privacy policy
          <ExternalLink className=""></ExternalLink>
        </a>
      </Trans>
    ),
    confirm: t("pages.confirmIdentity.form.confirm"),
  };

  const formValidationSchema: ObjectSchema<ConfirmIdentityFormModel> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("pages.confirmIdentity.form.errors.fieldRequired")
        .matches(EmailFormat, "pages.confirmIdentity.form.errors.invalidEmail"),
      bestAbilityAcknowledgement: yup
        .boolean()
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
      firstName: yup
        .string()
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
      lastName: yup
        .string()
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
      personalInformationCollectionAgreement: yup
        .boolean()
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
      phoneNumber: yup
        .string()
        .required("pages.confirmIdentity.form.errors.fieldRequired")
        .min(11, "pages.confirmIdentity.form.errors.phoneNumberMinLength"),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ConfirmIdentityFormModel>({
    defaultValues: {
      email: "",
      bestAbilityAcknowledgement: false,
      firstName: "",
      lastName: "",
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

  return (
    <form
      id="confirm-identity-form"
      data-testid="confirm-identity-form"
      className="space-y-4"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <p className="flex gap-x-[6px] font-normal">
        <span>{<AlertInfoOutline />}</span>
        <span className="opacity-60">{pageContent.allFieldsRequired}</span>
      </p>

      <div
        className={cn("form-group", {
          "has-error": errors.firstName,
        })}
      >
        <label htmlFor="firstName" className="form-label">
          {pageContent.firstName}
        </label>
        <div className="flex flex-col gap-y-[6px] lg:flex-row lg:items-center lg:gap-x-6">
          <input
            {...register("firstName")}
            id="firstName"
            className="input w-full py-5 lg:max-w-[486px]"
            type="text"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          <p className="inline-flex gap-x-[6px] font-normal">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.identityInfo}</span>
          </p>
        </div>

        {errors.firstName?.message && (
          <span className="error-warning" id="firstName-error">
            {t(errors.firstName.message)}
          </span>
        )}
      </div>

      <div
        className={cn("form-group w-full lg:w-[554px]", {
          "has-error": errors.lastName,
        })}
      >
        <label htmlFor="lastName" className="form-label">
          {pageContent.lastName}
        </label>
        <input
          {...register("lastName")}
          id="lastName"
          className="input w-full py-5 lg:max-w-[486px]"
          type="text"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
        />
        {errors.lastName?.message && (
          <span className="error-warning" id="lastName-error">
            {t(errors.lastName.message)}
          </span>
        )}
      </div>

      <div
        className={cn("form-group", {
          "has-error": errors.email,
        })}
      >
        <label htmlFor="email" className="form-label">
          {pageContent.email}
        </label>
        <div className="flex flex-col gap-y-[6px] lg:flex-row lg:items-center lg:gap-x-6">
          <input
            {...register("email")}
            id="email"
            className="input w-full py-5 lg:max-w-[486px]"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <p className="inline-flex gap-x-[6px] font-normal">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.emailInfo}</span>
          </p>
        </div>
        {errors.email?.message && (
          <span className="error-warning" id="email-error">
            {t(errors.email.message)}
          </span>
        )}
      </div>

      <div
        className={cn("form-group", {
          "has-error": errors.phoneNumber,
        })}
      >
        <label htmlFor="phoneNumber" className="form-label">
          {pageContent.phoneNumber}
        </label>
        <div className="flex flex-col gap-y-[6px] lg:flex-row lg:items-center lg:gap-x-6">
          <InputMask
            mask="___________"
            replacement={{ _: /\d/ }}
            {...register("phoneNumber")}
            id="phoneNumber"
            className="input w-full py-5 lg:max-w-[486px]"
            type="tel"
            aria-invalid={!!errors.phoneNumber}
            aria-describedby={
              errors.phoneNumber ? "phoneNumber-error" : undefined
            }
          />
          <p className="inline-flex gap-x-[6px] font-normal">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.phoneNumberInfo}</span>
          </p>
        </div>
        {errors.phoneNumber?.message && (
          <span className="error-warning" id="phoneNumber-error">
            {t(errors.phoneNumber.message)}
          </span>
        )}
      </div>

      <div className="form-radio-checkbox-group mt-[6px] !items-start lg:mt-4">
        <div className="flex items-center justify-center">
          <Checkbox
            {...register("bestAbilityAcknowledgement")}
            id="bestAbilityAcknowledgement"
            aria-invalid={!!errors.bestAbilityAcknowledgement}
          />
        </div>
        <label
          htmlFor="bestAbilityAcknowledgement"
          className="mt-1 border-primary-300 text-black"
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
            aria-invalid={!!errors.personalInformationCollectionAgreement}
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
        name="confirm-identity-submit-button"
        className="!mt-8 w-full rounded-md px-28 py-3 text-xl lg:w-[554px]"
        variant={formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY}
        type={ButtonType.SUBMIT}
      >
        {pageContent.confirm}
      </Button>
    </form>
  );
};

export default ConfirmIdentityForm;
