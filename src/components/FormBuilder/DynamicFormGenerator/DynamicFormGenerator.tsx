import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { InputValue } from "@/models/form/DynamicJsonFormTypes";
import DynamicInputControl from "@/components/FormBuilder/DynamicInputControl/DynamicInputControl";
import { checkConditionalLogic } from "@/utils/FormBuilder";
import { IDynamicFormGeneratorProps } from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator.d";
import { cn } from "@/utils/helper";
import BasicInformationSection from "@/components/AddEvent/components/BasicInformationSection";

const DynamicFormGenerator = (props: IDynamicFormGeneratorProps) => {
  const {
    schema,
    resolver,
    className,
    onFormSubmit,
    validActivities,
    defaultValues: eventValues,
  } = props;
  const { t } = useTranslation();

  type DynamicForm = {
    [K in (typeof schema)["formSections"][number]["fields"][number]["name"]]: (typeof schema)["formSections"][number]["fields"][number]["name"];
  };

  const defaultValues = useMemo(() => {
    const defaultEventValues = { ...eventValues };
    return {
      ...schema.formSections.reduce(
        (values, formSection) => {
          return {
            ...values,
            ...formSection.fields.reduce(
              (records, field) => {
                records[field.name] =
                  defaultEventValues?.[field.name] ?? field.value ?? "";
                if (defaultEventValues?.[field.name]) {
                  delete defaultEventValues[field.name];
                }
                return records;
              },
              {} as Record<string, InputValue>,
            ),
          };
        },
        {} as Record<string, InputValue>,
      ),
      ...defaultEventValues,
      ...{
        eventName: "",
        facilityInfo: [
          {
            facility: "",
            rentalFacilityAgreementNumber: "",
            dateRanges: [{ endDate: new Date(), startDate: new Date() }],
          },
        ],
      },
    };
  }, [eventValues, schema.formSections]);

  const onSubmit = useCallback(
    (data: DynamicForm) => {
      onFormSubmit?.(data);
    },
    [onFormSubmit],
  );

  const methods = useForm({
    resolver,
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, watch } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {schema.formSections
          .filter((section) =>
            checkConditionalLogic(
              section.title ?? "",
              watch(),
              validActivities,
              "and",
            ),
          )
          .map((section, index) => (
            <div key={section.key} className={cn({ "mt-6": index > 0 })}>
              {section.title && (
                <h2 className="mb-2 font-segoe text-2xl font-bold text-primary">
                  {t(section.title)}
                </h2>
              )}
              {section.description && (
                <p className="mb-6">{t(section.description)}</p>
              )}
              <div className="space-y-6">
                <BasicInformationSection />
                {section.fields.map((field, i) => (
                  <DynamicInputControl
                    validActivities={validActivities}
                    key={field.id ? String(field.id) : field.name}
                    name={field.name}
                    label={field.label}
                    info={field.info}
                    value={eventValues?.[field.name] ?? field.value}
                    type={field.type}
                    validations={field.validations}
                    placeholder={field.placeholder}
                    options={field?.options}
                    renderLogicConditionMode={field?.depRenderConditionMode}
                    renderLogic={field?.renderLogic}
                    valueLogicConditionMode={field?.depValueConditionMode}
                    valueLogic={field.valueLogic}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
      </form>
    </FormProvider>
  );
};

export default DynamicFormGenerator;
