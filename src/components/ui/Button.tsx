import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button = (props: ButtonProps) => {
  return (
    <button {...props} className={twMerge(props.className, "bg-primary ")}>
      {props.children}
    </button>
  );
};

export default Button;
