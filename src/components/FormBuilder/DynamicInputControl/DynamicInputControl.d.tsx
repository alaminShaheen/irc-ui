import { SelectOption } from "@/models/SelectOption";
import {
  ConditionalLogic,
  ConditionalValue,
  ConditionMode,
  InputValue,
  Validations,
} from "@/models/form/DynamicJsonFormTypes";

export interface IDynamicInputControlProps {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: SelectOption<any>[];
  validations?: Validations;
  value?: InputValue;

  renderLogic?: ConditionalLogic[];
  renderLogicConditionMode?: ConditionMode;

  valueLogicConditionMode?: ConditionMode;
  valueLogic?: ConditionalValue[];
  index: number;
}
