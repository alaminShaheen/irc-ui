import { forwardRef } from "react";

import { cn } from "@/utils/helper";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { IInputWithIconProps } from "@/components/ui/InputWithIcon/InputWithIcon.d";

const InputWithIcon = forwardRef<HTMLInputElement, IInputWithIconProps>(
  (props, ref) => {
    const { type, icon, iconPosition, className, ...rest } = props;
    console.log(rest.id,  rest.name);
    return (
      <span className="relative">
        {!!icon && iconPosition === IconPosition.LEFT && (
          <span className="absolute top-1/2 transform -translate-y-1/2 translate-x-4">
            {icon}
          </span>
        )}
        <input
          {...rest}
          ref={ref}
          type={type}
          className={cn(className, "w-full", {
            "!pl-14": iconPosition === IconPosition.LEFT,
            "!pr-14": iconPosition === IconPosition.RIGHT,
          })}
        />
        {!!icon && iconPosition === IconPosition.RIGHT && (
          <span className="absolute top-1/2 transform -translate-y-1/2 translate-x-4">
            {icon}
          </span>
        )}
      </span>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
