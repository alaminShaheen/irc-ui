import { isValidElement } from "react";

import alertInfo from "@/assets/icons/alert-info.svg";
import { IAlertProps } from "@/components/ui/Alert/Alert.d";
import Icon from "@/components/ui/Icon";

const Alert = (props: IAlertProps) => {
  const { alertMessage } = props;
  return (
    <div
      role="alert"
      className="inline-flex items-start p-3 bg-primary text-white rounded gap-x-2 w-full"
    >
      <span>
        <Icon src={alertInfo} alt="alert-info" size={24} />
      </span>
      <span className="text-base w-full">
        {isValidElement(alertMessage) ? (
          alertMessage
        ) : (
          <span>{alertMessage}</span>
        )}
      </span>
    </div>
  );
};

export default Alert;
