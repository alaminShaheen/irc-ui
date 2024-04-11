import * as yup from "yup";
import { ObjectSchema } from "yup";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
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
    checkbox1Label: t("pages.confirmIdentity.form.checkbox1Label"),
    checkbox2Label: t("pages.confirmIdentity.form.checkbox2Label"),
    confirm: t("pages.confirmIdentity.form.confirm"),
  };

  const formValidationSchema: ObjectSchema<ConfirmIdentityFormModel> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
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
        .required("pages.confirmIdentity.form.errors.fieldRequired"),
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
    <div>
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

        <div className="grid lg:grid-cols-[554px_1fr] lg:gap-x-6">
          <div
            className={cn("form-group", {
              "has-error": errors.firstName,
            })}
          >
            <label htmlFor="firstName" className="form-label">
              {pageContent.firstName}
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              className="input w-full py-5"
              type="text"
            />

            {errors.firstName?.message && (
              <span className="error-warning">
                {t(errors.firstName.message)}
              </span>
            )}
          </div>
          <p className="hidden gap-x-[6px] font-normal lg:flex">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.identityInfo}</span>
          </p>
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
            className="input w-full py-5"
            type="text"
          />
          {errors.lastName?.message && (
            <span className="error-warning">{t(errors.lastName.message)}</span>
          )}
        </div>

        <div className="grid lg:grid-cols-[554px_1fr] lg:gap-x-6">
          <div
            className={cn("form-group", {
              "has-error": errors.email,
            })}
          >
            <label htmlFor="email" className="form-label">
              {pageContent.email}
            </label>
            <input
              {...register("email")}
              id="email"
              className="input w-full py-5"
              type="email"
            />
            {errors.email?.message && (
              <span className="error-warning">{t(errors.email.message)}</span>
            )}
          </div>
          <p className="hidden gap-x-[6px] font-normal lg:flex">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.emailInfo}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-[554px_1fr] lg:gap-x-6">
          <div
            className={cn("form-group", {
              "has-error": errors.phoneNumber,
            })}
          >
            <label htmlFor="phoneNumber" className="form-label">
              {pageContent.phoneNumber}
            </label>
            <InputMask
              mask="___________"
              replacement={{ _: /\d/ }}
              {...register("phoneNumber")}
              id="phoneNumber"
              className="input w-full py-5"
              type="tel"
            />
            {errors.phoneNumber?.message && (
              <span className="error-warning">
                {t(errors.phoneNumber.message)}
              </span>
            )}
          </div>
          <p className="hidden gap-x-[6px] font-normal lg:flex">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{pageContent.phoneNumberInfo}</span>
          </p>
        </div>

        <div className="form-radio-checkbox-group !items-start">
          <div className="flex items-center justify-center">
            <Checkbox
              {...register("bestAbilityAcknowledgement")}
              id="bestAbilityAcknowledgement"
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
          className="!mt-8 w-full rounded-md px-28 py-3 text-xl lg:w-auto"
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          {pageContent.confirm}
        </Button>
      </form>
    </div>
  );
};

export default ConfirmIdentityForm;