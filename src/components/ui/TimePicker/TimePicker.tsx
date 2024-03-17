import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/utils/helper";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";

const TimePicker = forwardRef<DatePicker, IDatePickerProps>((props, ref) => {
  return (
    <DatePicker
      customInput={
        props.icon ? (
          <InputWithIcon
            type="time"
            id={props.id}
            name={props.name}
            icon={props.icon}
            className={cn("input", { "input-has-error": props.hasError })}
            iconPosition={IconPosition.LEFT}
          />
        ) : (
          <input type="date" id={props.id} name={props.name} />
        )
      }
      id={props.id}
      name={props.name}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      placeholderText={props.placeholderText}
      className={cn(props.className, "cursor-pointer")}
      selected={props.dateValue}
      ref={ref}
      onChange={props.dateOnChange}
    />
  );
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
