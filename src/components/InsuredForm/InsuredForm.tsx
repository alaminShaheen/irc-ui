import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button/Button";
import { InsuredFormModel } from "@/models/form/InsuredFormModel";
import { IInsuredFormProps } from "@/components/InsuredForm/InsuredForm.d";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import { formatPhoneNumber } from "@/utils/helper";

const InsuredForm = (props: IInsuredFormProps) => {
  const { editModeEnabled, onCancel, onSave } = props;
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
              Name of Insured:
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              className="input py-5 w-full lg:w-1/2"
              type="text"
              disabled={false}
            />
            {errors.name?.message && (
              <span className="text-xs text-red-500 my-2">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="address" className="text-white-5">
              Address of Insured:
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              id="address"
              className="input py-5 w-full lg:w-1/2"
              type="text"
              disabled={false}
            />
            {errors.address?.message && (
              <span className="text-xs text-red-500 my-2">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="telephone" className="text-white-5">
              Telephone number:
            </label>
            <input
              {...register("telephone", {
                required: "Telephone number is required",
              })}
              id="telephone"
              className="input py-5 w-full lg:w-1/2"
              type="tel"
              disabled={false}
            />
            {errors.telephone?.message && (
              <span className="text-xs text-red-500 my-2">
                {errors.telephone.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="text-white-5">
              Email address:
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              className="input py-5 w-full lg:w-1/2"
              type="email"
              disabled={false}
            />
            {errors.email?.message && (
              <span className="text-xs text-red-500 my-2">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex gap-x-3 mt-2">
            <Button onClick={onCancel} variant={ButtonVariant.SECONDARY}>
              Cancel
            </Button>
            <Button
              className="bg-primary rounded-md text-white px-20"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">Name of Insured:</span>
            <div className="text-primary text-base">
              {insuredFormValues.name}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">Address of Insured:</span>
            <div className="text-primary text-base">
              {insuredFormValues.address}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">Telephone number:</span>
            <div className="text-primary text-base">
              {formatPhoneNumber(insuredFormValues.telephone)}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="text-graphite-700">Email address:</span>
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
