import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { IconPosition } from "@/models/enums/ButtonVariant";

export interface IInputWithIconProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  iconPosition: IconPosition;
  type: HTMLInputTypeAttribute;
}
