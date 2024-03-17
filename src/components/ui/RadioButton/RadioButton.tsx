import { forwardRef } from "react";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import radioCheck from "@/assets/icons/radio-check.svg";
import { IRadioButtonProps } from "@/components/ui/RadioButton/RadioButton.d";

const RadioButton = forwardRef<HTMLInputElement, IRadioButtonProps>(
  (props, ref) => {
    const { label, selected, ...rest } = props;

    return (
      <span
        className={cn(
          "py-3 px-4 bg-white rounded-md flex gap-x-3 w-auto border-2 border-primary-50 relative",
          {
            "bg-primary-50 border-primary": selected,
          },
        )}
      >
        {selected ? (
          <Icon
            tabIndex={0}
            src={radioCheck}
            alt="checked"
            size={24}
            className="focus-visible:outline-yellow-400 focus:outline-focus rounded-full"
          />
        ) : (
          <span
            tabIndex={0}
            className="w-6 h-6 rounded-full border border-graphite-300 focus-visible:outline-yellow-400 focus:outline-focus"
          />
        )}
        <input
          {...rest}
          type="radio"
          tabIndex={-1}
          className={cn(
            rest.className,
            "absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer",
          )}
          ref={ref}
        />
        <label htmlFor={rest.id}>{label}</label>
      </span>
    );
  },
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
