import { IButtonProps } from "@/components/ui/Button/Button.d";
import {
  ButtonVariant,
  ButtonType,
  ICON_POSITION,
} from "@/models/enums/ButtonVariant";
import { cn } from "@/utils/helper";

const DEFAULT_BUTTON_STYLE = "px-4 py-3";

const Button = (props: IButtonProps) => {
  const {
    className = "",
    variant = ButtonVariant.PRIMARY,
    buttonType = ButtonType.BUTTON,
    icon,
    iconPosition = ICON_POSITION.LEFT,
    ...rest
  } = props;

  return (
    <button
      className={cn(DEFAULT_BUTTON_STYLE, className, {
        "btn-primary text-xl": variant === ButtonVariant.PRIMARY,
        "btn-secondary text-md": variant === ButtonVariant.SECONDARY,
        "btn-disabled": variant === ButtonVariant.DISABLED,
        "btn-transparent": variant === ButtonVariant.TRANSPARENT,
      })}
      type={buttonType}
      {...rest}
    >
      {icon && iconPosition === ICON_POSITION.LEFT && icon}
      {props.children}

      {icon && iconPosition === ICON_POSITION.RIGHT && icon}
    </button>
  );
};

export default Button;
