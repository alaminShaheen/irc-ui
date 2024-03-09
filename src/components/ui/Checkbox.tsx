import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props;
  return (
    <input {...rest} type="checkbox"
           className={twMerge(className, "checkbox rounded w-[30px] h-[30px] border-primary [--chkbg:theme(colors.primary)] [--chkfg:white]")} />
  );
};

export default Checkbox;
