import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button = (props: ButtonProps) => {
  return (
    <button {...props} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;
