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
  key: string;
  title?: string;
  description?: string;
  fields: FormInput[];
  depRenderConditionMode?: ConditionMode;
  renderLogic?: ConditionalLogic[];
};

export type FormInput = {
  type: ControlType;
  name: string;
  value?: InputValue;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: SelectOption[];
  validations?: Validations;

  depRenderConditionMode?: ConditionMode;
  renderLogic?: ConditionalLogic[];

  depValueConditionMode?: ConditionMode;
  valueLogic?: ConditionalValue[];
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
