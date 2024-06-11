import { SelectOption } from "@/models/SelectOption";
import { InputValue } from "@/models/form/DynamicJsonFormTypes";

export interface ISelectDropdownProps {
  options: SelectOption<InputValue>[];
  onChange: (value: string) => void;
  value: string;
  name: string;
  label?: string;
  placeholderText?: string;
  disabled?: boolean;
}
