import { twMerge } from "tailwind-merge";

import { ICheckboxProps } from "@/components/ui/Checkbox/Checkbox.d";
import {AppConstants} from "@/constants/AppConstants";


const Checkbox = (props: ICheckboxProps) => {
  const { className, ...rest } = props;

  return (
    <input {...rest} type="checkbox"
           className={twMerge(className,
             "checkbox rounded border-primary [--chkbg:theme(colors.primary.900)] [--chkfg:white]",
             `w-[${AppConstants.CHECKBOX_SIZE}px] h-[${AppConstants.CHECKBOX_SIZE}px]`
           )}
    />

  );
};

export default Checkbox;
