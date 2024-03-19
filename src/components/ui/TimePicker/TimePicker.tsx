import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/utils/helper";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";

const TimePicker = forwardRef<DatePicker, IDatePickerProps>((props, ref) => {
  return (
    <DatePicker
      id={props.id}
      name={props.name}
      showIcon
      toggleCalendarOnIconClick
      icon={
        <span className="absolute top-1/2 h-7 w-7 -translate-y-1/2 translate-x-1.5 transform cursor-pointer">
          {props.icon}
        </span>
      }
      showTimeSelectOnly
      showTimeSelect
      timeIntervals={15}
      dateFormat="h:mm aa"
      placeholderText={props.placeholderText}
      className={cn(
        props.className,
        "input w-full cursor-pointer !py-4 !pl-14 !pr-3",
      )}
      selected={props.dateValue}
      ref={ref}
      onChange={props.dateOnChange}
    />
  );
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
