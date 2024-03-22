import { ReactNode } from "react";

export interface ITimePickerProps {
  timeOnChange: (time: string | null) => void;
  className?: string;
  timeValue: Date;
  name: string;
  icon?: ReactNode;
  placeholderText?: string;
  hasError?: boolean;
  id?: string;
}
