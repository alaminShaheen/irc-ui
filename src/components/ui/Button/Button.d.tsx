import { ButtonHTMLAttributes, ReactNode } from "react";

import { ButtonVariant } from "@/models/enums/ButtonVariant";


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

type ButtonIconProps = | {
  icon: ReactNode
  iconPosition?: "left" | "right"
} | {
  icon?: never;
  iconPosition?: never;
}

export type IButtonProps = ButtonProps & ButtonIconProps