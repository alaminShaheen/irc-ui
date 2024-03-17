import { ReactNode } from "react";

export interface IDatePickerProps {
  dateOnChange: (date: Date | null) => void;
  className?: string;
  dateValue: Date;
  name: string;
  icon?: ReactNode;
  placeholderText?: string;
  hasError?: boolean;
  id?: string;
}
