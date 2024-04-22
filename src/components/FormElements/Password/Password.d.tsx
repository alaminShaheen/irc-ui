export interface IPasswordProps {
  label: string;
  placeholderContent?: string;
  helperText?: string;
  containerStyle?: string;
  inputStyle?: string;
  showPasswordContent?: string;
  hidePasswordContent?: string;
}

export type TPasswordModel = {
  password: string;
};
