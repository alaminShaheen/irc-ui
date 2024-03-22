export interface IRadioGroupProps {
  name: string;
  radioProps: {
    value: string | number | readonly string[];
    label: string;
    checked: boolean;
  }[];
  className?: string;
}
