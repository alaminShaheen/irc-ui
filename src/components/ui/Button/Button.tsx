import { IButtonProps } from "@/components/ui/Button/Button.d";
import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import { cn } from "@/utils/helper";
import { forwardRef } from "react";

const DEFAULT_BUTTON_STYLE = "px-4 py-3 cursor-pointer";

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const {
    className = "",
    variant = ButtonVariant.PRIMARY,
    buttonType = ButtonType.BUTTON,
    icon,
    iconPosition = IconPosition.LEFT,
    ...rest
  } = props;

  return (
    <button
      className={cn(DEFAULT_BUTTON_STYLE, className, {
        "btn-primary text-xl": variant === ButtonVariant.PRIMARY,
        "btn-secondary text-md": variant === ButtonVariant.SECONDARY,
        "btn-disabled": variant === ButtonVariant.DISABLED || props.disabled,
        "btn-transparent": variant === ButtonVariant.TRANSPARENT,
        btn: variant === ButtonVariant.VANILLA,
      })}
      ref={ref}
      type={buttonType}
      {...rest}
    >
      {!!icon && iconPosition === IconPosition.LEFT && icon}
      {props.children}
      {!!icon && iconPosition === IconPosition.RIGHT && icon}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
