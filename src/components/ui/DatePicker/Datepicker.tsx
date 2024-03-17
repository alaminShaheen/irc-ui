import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/utils/helper";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { IconPosition } from "@/models/enums/ButtonVariant";
import { IDatePickerProps } from "@/components/ui/DatePicker/Datepicker.d";

const Datepicker = forwardRef<DatePicker, IDatePickerProps>((props, ref) => {
  return (
    <DatePicker
      customInput={
        props.icon ? (
          <InputWithIcon
            icon={props.icon}
            id={props.id}
            name={props.name}
            type="date"
            className={cn("input", { "input-has-error": props.hasError })}
            iconPosition={IconPosition.LEFT}
          />
        ) : (
          <input type="date" id={props.id} name={props.name} />
        )
      }
      id={props.id}
      name={props.name}
      placeholderText={props.placeholderText}
      className={cn(props.className, "cursor-pointer")}
      selected={props.dateValue}
      ref={ref}
      onChange={props.dateOnChange}
    />
  );
});

Datepicker.displayName = "Datepicker";

export default Datepicker;
