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
        <span className="absolute top-1/2 transform -translate-y-1/2 translate-x-1.5 h-7 w-7 cursor-pointer">
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
        "cursor-pointer input !pl-14 !py-4 !pr-3 w-full",
      )}
      selected={props.dateValue}
      ref={ref}
      onChange={props.dateOnChange}
    />
  );
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
