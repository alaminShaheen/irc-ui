import { Fragment, useCallback, useEffect, useMemo } from "react";
import { IDynamicInputControlProps } from "@/components/FormBuilder/DynamicInputControl/DynamicInputControl.d";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { checkConditionalLogic } from "@/utils/FormBuilder";
import { cn, hasUndefinedValues } from "@/utils/helper";
import FormError from "@/components/FormError";
import { useTranslation } from "react-i18next";
import SelectDropdown from "@/components/ui/SelectDropdown/SelectDropdown";
import RadioGroup from "@/components/ui/Radio/components/RadioGroup";
import Button from "@/components/ui/Button";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

const DynamicInputControl = (props: IDynamicInputControlProps) => {
  const {
    validActivities,
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
    info,
    value: defaultValue,
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
      validActivities,
      renderLogicConditionMode,
      renderLogic,
    );
  }, [name, watchList, validActivities, renderLogicConditionMode, renderLogic]);

  useEffect(() => {
    if (type === "submit" || !shouldRender) {
      unregister(name);
    } else {
      const value =
        valueLogic?.find((logicEntry) => {
          return checkConditionalLogic(
            name,
            watch(),
            validActivities,
            valueLogicConditionMode,
            logicEntry.logic,
          );
        })?.value ??
        defaultValue ??
        undefined;
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
    defaultValue,
    validActivities,
    type,
  ]);

  const formDisabled =
    Object.entries(errors).length > 0 || hasUndefinedValues(watch());

  const renderFields = useCallback(() => {
    switch (type) {
      case "text":
      case "number":
        return (
          <div
            className={cn("form-group", { "has-error": errors[name] })}
            key={name}
          >
            {label && <label htmlFor={name}>{t(label)}</label>}
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
            {label && <p className="form-label flex gap-x-3">{t(label)}</p>}
            <RadioGroup
              className="flex gap-x-4"
              name={name}
              radioProps={(options ?? []).map(
                ({ label, value: optionValue }) => ({
                  value: optionValue,
                  label: t(label),
                  checked: watch()[name] === optionValue,
                }),
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
      case "select":
        return (
          <div
            className={cn("form-group", {
              "has-error": errors[name],
            })}
            key={name}
          >
            {label && (
              <label htmlFor={name} className="form-label">
                {t(label)}
              </label>
            )}
            <Controller
              control={control}
              name={name}
              defaultValue=""
              render={({ field: { value, name, onChange } }) => (
                <SelectDropdown
                  options={(options ?? []).map(({ label, value, id }) => {
                    return { id, label: t(label), value };
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
            <Button
              variant={
                formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
              }
              className="mt-8 rounded-md px-16"
              type={ButtonType.SUBMIT}
              disabled={formDisabled}
            >
              {label ? t(label) : t("common.ok")}
            </Button>
          </div>
        );
    }
  }, [
    control,
    errors,
    formDisabled,
    label,
    name,
    options,
    placeholder,
    register,
    t,
    type,
    validations,
    watch,
  ]);

  if (!shouldRender) return null;

  return (
    <Fragment>
      {renderFields()}
      {info && <span dangerouslySetInnerHTML={{ __html: info }}></span>}
    </Fragment>
  );
};

export default DynamicInputControl;
