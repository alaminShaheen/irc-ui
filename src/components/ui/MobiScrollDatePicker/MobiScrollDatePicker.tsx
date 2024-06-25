import { forwardRef, useCallback } from "react";
import {
  Datepicker,
  MbscDatepickerChangeEvent,
  setOptions,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { IMobiScrollDatePickerProps } from "@/components/ui/MobiScrollDatePicker/Datepicker.d";
import { cn } from "@/utils/helper";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const MobiScrollDatePicker = forwardRef<Datepicker, IMobiScrollDatePickerProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, _) => {
    const {
      placeholderText,
      className,
      name,
      dateOnChange,
      value,
      defaultValue,
      index,
    } = props;

    const onDateChange = useCallback(
      (args: MbscDatepickerChangeEvent) => {
        if (args.value) {
          dateOnChange(index, args.value as Date[]);
        }
      },
      [dateOnChange, index],
    );

    return (
      <>
        <Datepicker
          controls={["calendar", "time"]}
          inputProps={{
            placeholder: placeholderText,
            className: cn("input", className),
          }}
          select="range"
          name={name}
          value={value}
          defaultValue={defaultValue}
          display="center"
          onChange={onDateChange}
          selectMultiple={false}
          inputComponent="input"
        />
      </>
    );
  },
);

MobiScrollDatePicker.displayName = "Datepicker";

export default MobiScrollDatePicker;
