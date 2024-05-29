import { useEffect, useMemo } from "react";
import { IDynamicInputControlProps } from "@/components/FormBuilder/DynamicInputControl/DynamicInputControl.d";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { checkConditionalLogic } from "@/utils/FormBuilder";
import { cn } from "@/utils/helper";
import FormError from "@/components/FormError";
import { useTranslation } from "react-i18next";
import SelectDropdown from "@/components/ui/SelectDropdown/SelectDropdown";
import RadioGroup from "@/components/ui/Radio/components/RadioGroup";

const DynamicInputControl = (props: IDynamicInputControlProps) => {
  const {
    name,
    renderLogic,
    renderLogicConditionMode,
    options,
    label,
    type,
    valueLogic,
    validations,
    valueLogicConditionMode,
    placeholder,
  } = props;
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    unregister,
    control,
    setValue,
    watch,
  } = useFormContext();

  const watchList = useWatch({
    control,
  });

  const shouldRender = useMemo(() => {
    return checkConditionalLogic(
      name,

      watchList,
      renderLogicConditionMode,
      renderLogic,
    );
  }, [name, watchList, renderLogicConditionMode, renderLogic]);

  useEffect(() => {
    if (!shouldRender) {
      unregister(name);
    } else {
      const value =
        valueLogic?.find((logicEntry) => {
          return checkConditionalLogic(
            name,
            watch(),
            valueLogicConditionMode,
            logicEntry.logic,
          );
        })?.value ?? undefined;
      setValue(name, value);
    }
  }, [
    name,
    setValue,
    shouldRender,
    unregister,
    valueLogic,
    valueLogicConditionMode,
    watch,
  ]);

  if (!shouldRender) return null;

  switch (type) {
    case "text":
    case "number":
      return (
        <div
          className={cn("form-group", { "has-error": errors[name] })}
          key={name}
        >
          <label htmlFor={name}>{label}</label>
          <input
            placeholder={placeholder || ""}
            id={name}
            {...register(name, {
              ...validations,
              setValueAs: (value) =>
                type === "number" ? parseInt(value) : String(value),
            })}
            type={type}
            className="input w-full py-5"
          />
          {errors[name]?.message && (
            <FormError
              id={`${name}-error`}
              errorMessage={t(errors[name]?.message as string)}
            />
          )}
        </div>
      );
    case "radio":
      return (
        <div
          className={cn("form-group", { "has-error": errors[name] })}
          key={name}
        >
          <p className="form-label flex gap-x-3">{label}</p>
          <RadioGroup
            className="flex gap-x-4"
            name={name}
            radioProps={(options ?? []).map(({ label, value }) => ({
              value,
              label,
              checked: watch()[name] === value,
            }))}
          />
          {errors[name]?.message && (
            <FormError
              id={`${name}-error`}
              errorMessage={t(errors[name]?.message as string)}
            />
          )}
        </div>
      );
    case "select":
      return (
        <div
          className={cn("form-group", {
            "has-error": errors[name],
          })}
          key={name}
        >
          <label htmlFor="country" className="form-label">
            {label}
          </label>
          <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { value, name, onChange } }) => (
              <SelectDropdown
                options={(options ?? []).map(({ label, value, id }) => {
                  return { id, label, value };
                })}
                placeholderText={placeholder}
                value={value}
                name={name}
                onChange={onChange}
              />
            )}
          />
          {errors[name]?.message && (
            <FormError
              id={`${name}-error`}
              errorMessage={t(errors[name]?.message as string)}
            />
          )}
        </div>
      );
    case "submit":
      return (
        <div key={name} className={`field`}>
          <input type="submit" value={label} />
        </div>
      );
  }
};

export default DynamicInputControl;
