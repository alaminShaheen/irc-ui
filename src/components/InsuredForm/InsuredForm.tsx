import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button/Button";
import { InsuredFormModel } from "@/models/form/InsuredFormModel";
import { IInsuredFormProps } from "@/components/InsuredForm/InsuredForm.d";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { formatPhoneNumber } from "@/utils/helper";

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
    },
  } = props;
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
        >
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name" className="text-white-5">
              {nameOfInsuredLabel}
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              className={twMerge(
                "input py-5 w-full lg:w-1/2",
                errors.name?.message && "has-error",
              )}
              type="text"
            />
            {errors.name?.message && (
              <span className="text-sm text-red-500 my-2">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="address" className="text-white-5">
              {addressOfInsuredLabel}
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              id="address"
              className={twMerge(
                "input py-5 w-full lg:w-1/2",
                errors.address?.message && "has-error",
              )}
              type="text"
            />
            {errors.address?.message && (
              <span className="text-sm text-red-500 my-2">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{telephoneNumLabel}</span>
            <div className="text-primary text-base">
              {formatPhoneNumber(insuredFormValues.telephone)}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{emailAddressLabel}</span>
            <div className="text-primary text-base">
              {insuredFormValues.email}
            </div>
          </div>
          <div className="flex gap-x-3 mt-2">
            <Button onClick={onCancel} variant={ButtonVariant.SECONDARY}>
              Cancel
            </Button>
            <Button
              className="bg-primary rounded-md text-white px-20"
              type={ButtonType.SUBMIT}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{nameOfInsuredLabel}</span>
            <div className="text-primary text-base">
              {insuredFormValues.name}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{addressOfInsuredLabel}</span>
            <div className="text-primary text-base">
              {insuredFormValues.address}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{telephoneNumLabel}</span>
            <div className="text-primary text-base">
              {formatPhoneNumber(insuredFormValues.telephone)}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">{emailAddressLabel}</span>
            <div className="text-primary text-base">
              {insuredFormValues.email}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuredForm;
