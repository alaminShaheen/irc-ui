import * as yup from "yup";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";

import {
  emailValidationSchema,
  phoneNumberValidationSchema,
} from "@/components/FormElements/ValidationSchemas";
import Email from "@/components/FormElements/Email";
import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import FormError from "@/components/FormError";
import PhoneNumber from "@/components/FormElements/PhoneNumber";
import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
import AgreementCheckboxes from "@/components/AgreementCheckboxes/AgreementCheckboxes";
import { ConfirmIdentityFormModel } from "@/models/form/ConfirmIdentityFormModel";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

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
            <FormError
              id="firstName-error"
              errorMessage={t(errors.firstName.message)}
            />
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
            <FormError
              id="lastName-error"
              errorMessage={t(errors.lastName.message)}
            />
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

        <AgreementCheckboxes
          checkbox1ContainerStyle="form-radio-checkbox-group mt-[6px] w-full !items-start lg:mt-4 lg:max-w-[554px]"
          checkbox2ContainerStyle="form-radio-checkbox-group w-full items-center lg:max-w-[554px]"
        />

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
