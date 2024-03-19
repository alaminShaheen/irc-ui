import { forwardRef } from "react";

import Icon from "@/components/ui/Icon";
import Tick from "../../AppIcons/Tick";
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
            "disabled:border-steel-400 disabled:bg-steel-400 peer relative h-checkbox w-checkbox cursor-pointer appearance-none rounded border-2 border-primary checked:border-0 checked:bg-primary checked:text-white",
          )}
        />
        <Icon
          src={tick}
          size={24}
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-3.5 transform peer-checked:block"
        />
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
