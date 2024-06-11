import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { InputValue } from "@/models/form/DynamicJsonFormTypes";
import DynamicInputControl from "@/components/FormBuilder/DynamicInputControl/DynamicInputControl";
import { checkConditionalLogic } from "@/utils/FormBuilder";
import { IDynamicFormGeneratorProps } from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator.d";
import { cn } from "@/utils/helper";

const DynamicFormGenerator = (props: IDynamicFormGeneratorProps) => {
  const { schema, resolver, className, onFormSubmit } = props;

  type DynamicForm = {
    [K in (typeof schema)["formSections"][number]["fields"][number]["name"]]: (typeof schema)["formSections"][number]["fields"][number]["name"];
  };

  const defaultValues = useMemo(() => {
    return schema.formSections.reduce(
      (values, formSection) => {
        return {
          ...values,
          ...formSection.fields.reduce(
            (records, field) => {
              records[field.name] = field.value ?? "";
              return records;
            },
            {} as Record<string, InputValue>,
          ),
        };
      },
      {} as Record<string, InputValue>,
    );
  }, [schema]);

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
            checkConditionalLogic(section.title ?? "", watch(), "and"),
          )
          .map((section, index) => (
            <div key={section.key} className={cn({ "mt-6": index > 0 })}>
              {section.title && (
                <h2 className="mb-2 font-segoe text-2xl font-bold text-primary">
                  {section.title}
                </h2>
              )}
              {section.description && (
                <p className="mb-6">{section.description}</p>
              )}
              <div className="space-y-6">
                {section.fields.map((field, i) => (
                  <DynamicInputControl
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={field.value}
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
