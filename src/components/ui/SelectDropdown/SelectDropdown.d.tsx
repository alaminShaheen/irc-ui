import { SelectOption } from "@/models/SelectOption";

export interface ISelectDropdownProps {
  options: SelectOption[];
  onChange: (value: string) => void;
  value: string;
  name: string;
  label?: string;
  placeholderText?: string;
  disabled?: boolean;
}
