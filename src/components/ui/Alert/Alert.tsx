import { isValidElement } from "react";

import alertInfo from "@/assets/icons/alert-info.svg";
import { IAlertProps } from "@/components/ui/Alert/Alert.d";
import Icon from "@/components/ui/Icon";
import { useTranslation } from "react-i18next";

const Alert = (props: IAlertProps) => {
  const { alertMessage } = props;
  const {t} = useTranslation()
  return (
    <div
      role="alert"
      className="inline-flex items-start p-3 bg-primary text-white rounded gap-x-2 w-full"
    >
      <span>
        <Icon
          src={alertInfo}
          alt={t("common.iconAltText.alertInfo")}
          size={24}
        />
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
