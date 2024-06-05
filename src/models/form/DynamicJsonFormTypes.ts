import { SelectOption } from "@/models/SelectOption";
import { RegisterOptions } from "react-hook-form";

export type ControlType =
  | "text"
  | "select"
  | "number"
  | "checkbox"
  | "date"
  | "time"
  | "radio"
  | "textarea"
  | "submit";

export type InputValue = string | number | boolean;
export type ConditionMode = "and" | "or";
export type Validations = Pick<
  RegisterOptions,
  | "required"
  | "max"
  | "maxLength"
  | "pattern"
  | "minLength"
  | "min"
  | "disabled"
>;

export type FormSection = {
  id: string;
  key: string;
  title?: string;
  description?: string;
  fields: FormInput[];
  depRenderConditionMode?: ConditionMode;
  renderLogic?: ConditionalLogic[];
};

export type FormInput = {
  name: string;
  value?: InputValue;
  placeholder?: string;
  label?: string;
  validations?: Validations;

  depRenderConditionMode?: ConditionMode;
  renderLogic?: ConditionalLogic[];

  depValueConditionMode?: ConditionMode;
  valueLogic?: ConditionalValue[];
} & (SelectFormInput | RadioFormInput | GenericFormInput);

type SelectFormInput = {
  type: Extract<ControlType, "select">;
  options: SelectOption<InputValue>[];
};

type RadioFormInput = {
  type: Extract<ControlType, "radio">;
  options: SelectOption<string | number | readonly string[]>[];
};

type GenericFormInput = {
  type: Exclude<ControlType, "select" | "radio">;
  options?: never;
};

export type ConditionalLogic = {
  depFieldName: string;
  depFieldValue: InputValue;
  depFieldValueCondition: ">" | "<" | ">=" | "<=" | "=" | "!=" | "NotEmpty";
  andGroup?: ConditionalLogic[];
};

export type ConditionalValue = {
  logic?: ConditionalLogic[];
  value: InputValue;
};
