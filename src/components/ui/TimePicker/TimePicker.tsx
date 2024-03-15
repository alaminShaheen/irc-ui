import ReactDatePicker from "react-datepicker";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { cn } from "@/utils/helper";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { twMerge } from "tailwind-merge";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";

const TimePicker = forwardRef<ReactDatePicker, IDatePickerProps>(
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
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        placeholderText={props.placeholderText}
        className={twMerge(props.className, "cursor-pointer")}
        selected={props.dateValue}
        ref={ref}
        onChange={props.dateOnChange}
      />
    );
  },
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
