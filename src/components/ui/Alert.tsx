import { isValidElement, ReactNode } from "react";
import { FaInfoCircle } from "react-icons/fa";


interface AlertProps {
  alertMessage: string | ReactNode;
}

const Alert = (props: AlertProps) => {
  const { alertMessage } = props;
  return (
    <div role="alert" className="inline-flex items-start p-3 bg-primary text-white rounded gap-x-2">
      <span>
        <FaInfoCircle className="fill-white text-primary my-1" size={18} />
      </span>
      <span className="text-sm">
        {
          isValidElement(alertMessage) ? alertMessage : <span>{alertMessage}</span>
        }
      </span>
    </div>
  );
};

export default Alert;
