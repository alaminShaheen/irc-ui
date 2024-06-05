import { BaseSyntheticEvent, useMemo } from "react";

import { InputValue } from "@/models/form/DynamicJsonFormTypes";
import DynamicInputControl from "@/components/FormBuilder/DynamicInputControl/DynamicInputControl";
import { checkConditionalLogic } from "@/utils/FormBuilder";
import { IDynamicFormGeneratorProps } from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator.d";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const DynamicFormGenerator = (props: IDynamicFormGeneratorProps) => {
  const { schema, resolver } = props;

  type DynamicForm = {
    [K in (typeof schema)[number]["fields"][number]["name"]]: (typeof schema)[number]["fields"][number]["name"];
  };

  const defaultValues = useMemo(() => {
    return schema.reduce(
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

  const onFormSubmit: SubmitHandler<DynamicForm> = (
    data: DynamicForm,
    e?: BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
  };

  const methods = useForm({
    resolver,
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, watch } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {schema
          .filter((section) =>
            checkConditionalLogic(section.title ?? "", watch(), "and"),
          )
          .map((section) => (
            <div key={section.key}>
              {section.title && <h3>{section.title}</h3>}
              {section.description && <p>{section.description}</p>}
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
