import { forwardRef } from "react";

import { cn } from "@/utils/helper";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { IInputWithIconProps } from "@/components/ui/InputWithIcon/InputWithIcon.d";

const InputWithIcon = forwardRef<HTMLInputElement, IInputWithIconProps>(
  (props, ref) => {
    const { type, icon, iconPosition, className, ...rest } = props;
    return (
      <span className="relative">
        {!!icon && iconPosition === IconPosition.LEFT && (
          <span className="absolute left-1 top-1/2 -translate-y-1/2 translate-x-4 transform">
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
          <span className="absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            {icon}
          </span>
        )}
      </span>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
