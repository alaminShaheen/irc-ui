import { ReactNode } from "react";

export interface IMobiScrollDatePickerProps {
  dateOnChange: (index: number, dates: Date[]) => void;
  className?: string;

  // dateValue: Date;
  name: string;
  icon?: ReactNode;
  placeholderText?: string;
  hasError?: boolean;
  value?: Date[];
  index: number;
  defaultValue?: Date[];
}
