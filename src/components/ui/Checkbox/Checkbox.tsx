import { forwardRef, Fragment } from "react";

import Icon from "@/components/ui/Icon";
import tick from "@/assets/icons/tick.svg";
import { cn } from "@/utils/helper";
import { ICheckboxProps } from "@/components/ui/Checkbox/Checkbox.d";

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (props: ICheckboxProps, ref) => {
    const { className, ...rest } = props;

    return (
      <Fragment>
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          className={cn(
            className,
            "appearance-none relative w-checkbox h-checkbox rounded-md peer border border-primary cursor-pointer checked:bg-primary checked:text-white checked:border-0 disabled:border-steel-400 disabled:bg-steel-400",
          )}
        />
        <Icon
          src={tick}
          size={30}
          className="absolute hidden peer-checked:block mr-2 pointer-events-none"
        />
      </Fragment>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
