import { ButtonHTMLAttributes, ReactNode } from "react";

import {
  ButtonVariant,
  ButtonType,
  ICON_POSITION,
} from "@/models/enums/ButtonVariant";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonType?: ButtonType;
}

type ButtonIconProps =
  | {
      icon: ReactNode;
      iconPosition?: ICON_POSITION;
    }
  | {
      icon?: never;
      iconPosition?: never;
    };

export type IButtonProps = ButtonProps & ButtonIconProps;
