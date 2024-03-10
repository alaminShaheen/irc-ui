import { IButtonProps } from "@/components/ui/Button/Button.d";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import { twMerge } from "tailwind-merge";

const Button = (props: IButtonProps) => {
  const {
    className = "",
    variant = ButtonVariant.PRIMARY,
    hasIcon = false,
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
    )} type={props.type || 'button'}>
      {props.children}
    </button>
  );
};

export default Button;
