import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/utils/helper";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";

const Datepicker = forwardRef<DatePicker, IDatePickerProps>((props, ref) => {
  return (
    <DatePicker
      id={props.id}
      dateFormat="yyyy-MM-dd"
      name={props.name}
      placeholderText={props.placeholderText}
      className={cn(
        props.className,
        "input w-full cursor-pointer !py-4 !pl-14 !pr-3",
      )}
      popperClassName="z-20"
      showIcon
      toggleCalendarOnIconClick
      wrapperClassName="sakib"
      icon={
        <span className="absolute top-1/2 h-7 w-7 -translate-y-1/2 translate-x-1.5 transform cursor-pointer">
          {props.icon}
        </span>
      }
      selected={props.dateValue}
      ref={ref}
      onChange={props.dateOnChange}
    />
  );
});

Datepicker.displayName = "Datepicker";

export default Datepicker;
