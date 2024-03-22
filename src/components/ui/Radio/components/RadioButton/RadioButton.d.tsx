import { InputHTMLAttributes } from "react";

export interface IRadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
