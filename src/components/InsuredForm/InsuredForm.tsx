import * as yup from "yup";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/ui/Button/Button";
import { InsuredFormModel } from "@/models/form/InsuredFormModel";
import { IInsuredFormProps } from "@/components/InsuredForm/InsuredForm.d";
import { cn, formatPhoneNumber } from "@/utils/helper";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

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
      fieldRequired,
    },
  } = props;

  const formValidationSchema: ObjectSchema<InsuredFormModel> = yup
    .object()
    .shape({
      name: yup.string().required(fieldRequired),
      address: yup.string().required(fieldRequired),
      telephone: yup.string().required(fieldRequired),
      email: yup.string().required(fieldRequired),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsuredFormModel>({
    defaultValues: {
      telephone: "",
      address: "",
      email: "",
      name: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema),
  });

  const [insuredFormValues, setInsuredFormValues] = useState<InsuredFormModel>({
    name: "John Doe",
    email: "myemail@gmail.com",
    address: "[Address]",
    telephone: "4372545078",
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
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onFormSubmit)}
          data-testid="insured-form"
        >
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name" className="text-white-5">
              {nameOfInsuredLabel}
            </label>
            <input
              {...register("name")}
              id="name"
              className={cn("input w-full py-5 lg:w-1/2", {
                "has-error": !!errors.name?.message,
              })}
              type="text"
            />
            {errors.name?.message && (
              <span className="my-2 text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="address" className="text-white-5">
              {addressOfInsuredLabel}
            </label>
            <input
              {...register("address")}
              id="address"
              className={cn("input w-full py-5 lg:w-1/2", {
                "has-error": !!errors.address?.message,
              })}
              type="text"
            />
            {errors.address?.message && (
              <span className="my-2 text-sm text-red-500">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="telephone" className="text-white-5">
              {telephoneNumLabel}
            </label>
            <InputMask
              mask="(999) 999-9999"
              replacement={{ 9: /\d/ }}
              {...register("telephone")}
              id="telephone"
              className={cn("input w-full py-5 lg:w-1/2", {
                "has-error": !!errors.telephone?.message,
              })}
              type="tel"
            />

            {errors.telephone?.message && (
              <span className="my-2 text-sm text-red-500">
                {errors.telephone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="text-white-5">
              {nameOfInsuredLabel}
            </label>
            <input
              {...register("email")}
              id="email"
              className={cn("input w-full py-5 lg:w-1/2", {
                "has-error": !!errors.email?.message,
              })}
              type="email"
            />
            {errors.email?.message && (
              <span className="my-2 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

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
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <span className="font-segoe text-graphite-700">
              {nameOfInsuredLabel}
            </span>
            <div className="text-base text-primary">
              {insuredFormValues.name}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-segoe text-graphite-700">
              {addressOfInsuredLabel}
            </span>
            <div className="text-base text-primary">
              {insuredFormValues.address}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-segoe text-graphite-700">
              {telephoneNumLabel}
            </span>
            <div className="text-base text-primary">
              {formatPhoneNumber(insuredFormValues.telephone)}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
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
