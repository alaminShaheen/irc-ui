import { ButtonHTMLAttributes } from "react";

import { ButtonVariant } from "@/models/enums/ButtonVariant";


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

type ButtonIconProps = | {
  hasIcon: true;
  iconPosition?: "left" | "right"
} | {
  hasIcon?: false;
  iconPosition?: never;
}

export type IButtonProps = ButtonProps & ButtonIconProps