import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ClassNameInput = string | object | undefined | null | false;

export const cn = (...inputs: ClassNameInput[]): string => {
  return twMerge(clsx(inputs)) as string;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export const hasUndefinedValues = (nestedObject: any): boolean => {
  if ([null, undefined].includes(nestedObject)) {
    return true;
  } else if (typeof nestedObject !== "object") {
    return false;
  }
  for (const key in nestedObject) {
    if (hasUndefinedValues(nestedObject[key])) {
      return true;
    }
  }
  return false;
};
