import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props;
  return (
    <input {...rest} type="checkbox" className={clsx(className, "rounded w-[28px] h-[28px]")} />
  );
};

export default Checkbox;
