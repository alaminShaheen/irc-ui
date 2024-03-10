import { twMerge } from "tailwind-merge";

import { IButtonProps } from "@/components/ui/Button/Button.d";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const Button = (props: IButtonProps) => {
  const {
    className = "",
    variant = ButtonVariant.PRIMARY,
    icon,
    iconPosition = "left",
    ...rest
  } = props;

  return (
    <button {...rest} className={twMerge(
      className,
      variant === ButtonVariant.PRIMARY && "btn-primary",
      variant === ButtonVariant.SECONDARY && "btn-secondary",
      variant === ButtonVariant.DISABLED && "btn-disabled",
      variant === ButtonVariant.TRANSPARENT && "btn-transparent",
    )} type={props.type || "button"}>
      {
        icon ? props.children : iconPosition === "left" ? (
          <>{icon} {props.children}</>
        ) : (
          <>{props.children}{icon}</>
        )
      }

    </button>
  );
};

export default Button;
