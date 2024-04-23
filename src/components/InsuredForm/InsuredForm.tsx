import * as yup from "yup";
import { ObjectSchema } from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/ui/Button/Button";
import { InsuredFormModel } from "@/models/form/InsuredFormModel";
import { IInsuredFormProps } from "@/components/InsuredForm/InsuredForm.d";
import { cn, formatPhoneNumber } from "@/utils/helper";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import Email from "@/components/FormElements/Email";
import PhoneNumber from "@/components/FormElements/PhoneNumber";
import {
  emailValidationSchema,
  phoneNumberValidationSchema,
} from "@/components/FormElements/ValidationSchemas";

const InsuredForm = (props: IInsuredFormProps) => {
  const {
    editModeEnabled,
    onCancel,
    onSave,
    content: {
      nameOfInsuredLabel,
      addressOfInsuredLabel,
      telephoneNumLabel,
      emailAddressLabel,
      fieldRequiredKey,
    },
  } = props;
  const { t } = useTranslation();
  const formValidationSchema: ObjectSchema<InsuredFormModel> = yup
    .object()
    .shape({
      name: yup.string().required(fieldRequiredKey),
      address: yup.string().required(fieldRequiredKey),
      phoneNumber: phoneNumberValidationSchema,
      email: emailValidationSchema,
    });

  const methods = useForm({
    defaultValues: {
      phoneNumber: "",
      address: "",
      email: "",
      name: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [insuredFormValues, setInsuredFormValues] = useState({
    name: "John Doe",
    email: "myemail@gmail.com",
    address: "[Address]",
    phoneNumber: "4372345678",
  });

  const onFormSubmit = useCallback(
    (formValues: InsuredFormModel) => {
      setInsuredFormValues(formValues);
      onSave();
    },
    [onSave],
  );

  useEffect(() => {
    if (editModeEnabled) {
      reset(insuredFormValues);
    }
  }, [editModeEnabled, insuredFormValues, reset]);

  return (
    <div className="mt-4">
      {editModeEnabled ? (
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(onFormSubmit)}
            data-testid="insured-form"
          >
            <div className={cn("form-group", { "has-error": errors.name })}>
              <label htmlFor="name" className="form-label">
                {nameOfInsuredLabel}
              </label>
              <input
                {...register("name")}
                id="name"
                className="input w-full py-5 lg:w-1/2"
                type="text"
              />
              {errors.name?.message && (
                <span className="error-warning">{t(errors.name.message)}</span>
              )}
            </div>

            <div className={cn("form-group", { "has-error": errors.address })}>
              <label htmlFor="address" className="form-label">
                {addressOfInsuredLabel}
              </label>
              <input
                {...register("address")}
                id="address"
                className="input w-full py-5 lg:w-1/2"
                type="text"
              />
              {errors.address?.message && (
                <span className="error-warning">
                  {t(errors.address.message)}
                </span>
              )}
            </div>

            <PhoneNumber label={telephoneNumLabel} inputStyle="lg:w-1/2" />

            <Email
              label={nameOfInsuredLabel}
              inputStyle="input w-full py-5 lg:w-1/2"
            />

            <div className="mt-2 flex gap-x-3">
              <Button onClick={onCancel} variant={ButtonVariant.SECONDARY}>
                Cancel
              </Button>
              <Button
                className="rounded-md bg-primary px-20 text-white"
                type={ButtonType.SUBMIT}
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="form-group">
            <span className="font-segoe text-graphite-700">
              {nameOfInsuredLabel}
            </span>
            <div className="text-base text-primary">
              {insuredFormValues.name}
            </div>
          </div>

          <div className="form-group">
            <span className="font-segoe text-graphite-700">
              {addressOfInsuredLabel}
            </span>
            <div className="text-base text-primary">
              {insuredFormValues.address}
            </div>
          </div>

          <div className="form-group">
            <span className="font-segoe text-graphite-700">
              {telephoneNumLabel}
            </span>
            <div className="text-base text-primary">
              {formatPhoneNumber(insuredFormValues.phoneNumber)}
            </div>
          </div>

          <div className="form-group">
            <span className="font-segoe text-graphite-700">
              {emailAddressLabel}
            </span>
            <div className="text-base text-primary">
              {insuredFormValues.email}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuredForm;
