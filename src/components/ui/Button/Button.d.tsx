import { ButtonHTMLAttributes, ReactNode } from "react";

import {
  ButtonVariant,
  ButtonType,
  IconPosition,
} from "@/models/enums/ButtonVariant";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonType?: ButtonType;
}

type ButtonIconProps =
  | {
      icon: ReactNode;
      iconPosition?: IconPosition;
    }
  | {
      icon?: never;
      iconPosition?: never;
    };

export type IButtonProps = ButtonProps & ButtonIconProps;
