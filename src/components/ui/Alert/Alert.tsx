import { isValidElement } from "react";

import AlertInfo from "../../AppIcons/AlertInfo";
import { IAlertProps } from "@/components/ui/Alert/Alert.d";
import Icon from "@/components/ui/Icon";
import { useTranslation } from "react-i18next";

const Alert = (props: IAlertProps) => {
  const { alertMessage } = props;
  const { t } = useTranslation();
  return (
    <div
      role="alert"
      className="inline-flex w-full items-start gap-x-2 rounded bg-primary p-3 text-white"
    >
      <span>
        <Icon
          src={<AlertInfo />}
          alt={t("common.iconAltText.alertInfo")}
          size={24}
        />
      </span>
      <span className="w-full text-base">
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
