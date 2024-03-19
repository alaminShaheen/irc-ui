import { forwardRef } from "react";

import Icon from "@/components/ui/Icon";
import tick from "@/assets/icons/tick.svg";
import { cn } from "@/utils/helper";
import { ICheckboxProps } from "@/components/ui/Checkbox/Checkbox.d";

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (props: ICheckboxProps, ref) => {
    const { className, ...rest } = props;

    return (
      <span className="relative">
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          className={cn(
            className,
            "disabled:border-steel-400 disabled:bg-steel-400 peer relative h-checkbox w-checkbox cursor-pointer appearance-none rounded-md border border-primary checked:border-0 checked:bg-primary checked:text-white",
          )}
        />
        <Icon
          src={tick}
          size={30}
          className="pointer-events-none absolute left-0 top-0 mr-2 hidden peer-checked:block"
        />
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
