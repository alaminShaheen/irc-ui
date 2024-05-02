import * as yup from "yup";
import { ObjectSchema } from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trans, useTranslation } from "react-i18next";

import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import ExternalLink from "@/components/AppIcons/ExternalLink";
import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
import { ConfirmIdentityFormModel } from "@/models/form/ConfirmIdentityFormModel";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import Checkbox from "@/components/ui/Checkbox";
import Email from "@/components/FormElements/Email";
import PhoneNumber from "@/components/FormElements/PhoneNumber";
import {
  emailValidationSchema,
  phoneNumberValidationSchema,
} from "@/components/FormElements/ValidationSchemas";
import AlertDanger from "@/components/AppIcons/AlertDanger";

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
      <Trans i18nKey="common.disclaimer.checkbox1Label">
        I understand and agree to the use of
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          application agreement
          <ExternalLink />
        </a>
      </Trans>
    ),
    checkbox2Label: (
      <Trans i18nKey="common.disclaimer.checkbox2Label">
        I understand and agree the information submitted will be used in line
        with our
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          privacy policy
          <ExternalLink />
        </a>
      </Trans>
    ),
    confirm: t("pages.confirmIdentity.form.confirm"),
  };

  const formValidationSchema: ObjectSchema<ConfirmIdentityFormModel> = yup
    .object()
    .shape({
      email: emailValidationSchema,
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
      phoneNumber: phoneNumberValidationSchema,
    });

  const methods = useForm({
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

  return (
    <FormProvider {...methods}>
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
              className="input w-full py-5 lg:max-w-[554px]"
              type="text"
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            <p className="inline-flex gap-x-[6px] font-normal">
              <span>{<AlertInfoOutline />}</span>
              <span className="opacity-60">{pageContent.identityInfo}</span>
            </p>
          </div>

          {errors.firstName?.message && (
            <span
              className="error-warning"
              id="firstName-error"
              aria-live="assertive"
            >
              <AlertDanger className="fill-alert" />
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
            className="input w-full py-5 lg:max-w-[554px]"
            type="text"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName?.message && (
            <span
              className="error-warning"
              id="lastName-error"
              aria-live="assertive"
            >
              <AlertDanger className="fill-alert" />
              {t(errors.lastName.message)}
            </span>
          )}
        </div>

        <Email
          label={pageContent.email}
          helperText={pageContent.emailInfo}
          containerStyle="flex flex-col gap-y-[6px] lg:flex-row lg:items-center lg:gap-x-6"
          inputStyle="lg:max-w-[554px]"
        />

        <PhoneNumber
          label={pageContent.phoneNumber}
          helperText={pageContent.phoneNumberInfo}
          containerStyle="flex flex-col gap-y-[6px] lg:flex-row lg:items-center lg:gap-x-6"
          inputStyle="lg:max-w-[554px]"
        />

        <div className="form-radio-checkbox-group mt-[6px] w-full !items-start lg:mt-4 lg:max-w-[554px]">
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

        <div
          className={cn(`ml-auto h-1 border-t border-primary-300 md:hidden`)}
        />

        <div className="form-radio-checkbox-group w-full items-center lg:max-w-[554px]">
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
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          {pageContent.confirm}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ConfirmIdentityForm;
