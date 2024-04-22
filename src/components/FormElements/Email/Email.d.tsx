export interface IEmailProps {
  label: string;
  placeholderContent?: string;
  helperText?: string;
  containerStyle?: string;
  inputStyle?: string;
}

export type TEmailModel = {
  email: string;
};
