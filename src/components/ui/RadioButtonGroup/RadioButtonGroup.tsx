import { forwardRef, Fragment, useState } from "react";

import { cn } from "@/utils/helper";
import radioCheck from "@/assets/icons/radio-check.svg";
import Icon from "@/components/ui/Icon";
import { IRadioButtonGroupProps } from "@/components/ui/RadioButtonGroup/RadioButtonGroup.d";

const RadioButtonGroup = forwardRef<HTMLInputElement, IRadioButtonGroupProps>(
  (props, ref) => {
    const { radioButtons, ...rest } = props;
    const [selectedValue, setSelectedValue] = useState(rest.defaultValue);

    return (
      <Fragment>
        {radioButtons.map((radioButton, index) => {
          return (
            <span
              key={index}
              className={cn(
                "py-3 px-4 bg-white rounded-md flex gap-x-3 w-auto border-2 border-primary-50 relative",
                {
                  "bg-primary-50 border-primary":
                    radioButton.value === selectedValue,
                },
              )}
            >
              {radioButton.value === selectedValue ? (
                <Icon src={radioCheck} alt="checked" size={24} />
              ) : (
                <span className="w-6 h-6 rounded-full border border-graphite-300" />
              )}
              <input
                {...rest}
                onChange={(event) => {
                  rest.onChange?.(event);
                  setSelectedValue(radioButton.value);
                }}
                value={radioButton.value}
                checked={selectedValue === radioButton.value}
                type="radio"
                className={cn(
                  rest.className,
                  "absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer",
                )}
                id={radioButton.id}
                ref={ref}
              />
              <label htmlFor={rest.id}>{radioButton.label}</label>
            </span>
          );
        })}
      </Fragment>
    );
  },
);

RadioButtonGroup.displayName = "RadioButtonGroup";

export default RadioButtonGroup;
