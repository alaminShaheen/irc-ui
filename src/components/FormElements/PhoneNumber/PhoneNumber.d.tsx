export interface IPhoneNumberProps {
  label: string;
  placeholderContent?: string;
  helperText?: string;
  containerStyle?: string;
  inputStyle?: string;
}

export type TPhoneNumberModel = {
  phoneNumber: string;
};
