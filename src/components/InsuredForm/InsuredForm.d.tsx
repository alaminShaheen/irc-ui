export interface IInsuredFormProps {
  editModeEnabled: boolean;
  onCancel: () => void;
  onSave: () => void;
  content: {
    [key: string]: string;
  };
}
