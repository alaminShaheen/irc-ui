import { IButtonProps } from "@/components/ui/Button/Button.d";

const Button = (props: IButtonProps) => {
  return (
    <button {...props} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;
