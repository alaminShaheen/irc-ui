import { twMerge } from "tailwind-merge";

import { ICheckboxProps } from "@/components/ui/Checkbox/Checkbox.d";

const Checkbox = (props: ICheckboxProps) => {
  const { className, ...rest } = props;
  return (
    <input {...rest} type="checkbox"
           className={twMerge(className, "checkbox rounded w-[30px] h-[30px] border-primary [--chkbg:theme(colors.primary)] [--chkfg:white]")} />
  );
};

export default Checkbox;
