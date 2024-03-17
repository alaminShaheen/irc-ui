import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

import InputWithIcon from "@/components/ui/InputWithIcon";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";
import { cn } from "@/utils/helper";

const Datepicker = forwardRef<ReactDatePicker, IDatePickerProps>(
  (props, ref) => {
    return (
      <DatePicker
        customInput={
          props.icon ? (
            <InputWithIcon
              icon={props.icon}
              className={cn("input", { "input-has-error": props.hasError })}
              iconPosition={IconPosition.LEFT}
            />
          ) : (
            <input />
          )
        }
        placeholderText={props.placeholderText}
        className={cn(props.className, "cursor-pointer")}
        selected={props.dateValue}
        ref={ref}
        onChange={props.dateOnChange}
      />
    );
  },
);

Datepicker.displayName = "Datepicker";

export default Datepicker;
