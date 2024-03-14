import { InputHTMLAttributes } from "react";

export interface IRadioButtonGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {
  radioButtons: {
    id: string;
    value: any;
    label: string;
  }[];
}
