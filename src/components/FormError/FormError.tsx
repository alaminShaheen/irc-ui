import AlertDanger from "../AppIcons/AlertDanger";

interface IFormErrorProps {
  id: string;
  errorMessage: string;
}

const FormError = (props: IFormErrorProps) => {
  const { id, errorMessage } = props;

  return (
    <span
      id={id}
      className="error-warning"
      aria-live="assertive"
      data-testid="formError-body"
    >
      <AlertDanger className="fill-alert" data-testid="formError-alert" />
      {errorMessage}
    </span>
  );
};

export default FormError;
