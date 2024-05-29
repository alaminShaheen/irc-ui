import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ROUTES from "@/constants/Routes";

interface ISidebarProfile {
  fullName: string;
}

const SidebarProfile = ({ fullName }: ISidebarProfile) => {
  const { t } = useTranslation();

  return (
    <div className="mb-2 lg:hidden">
      <ul className="text-base text-white">
        <li className="mt-2">{fullName}</li>
        <li className="mt-2">
          <a href="https://demo.instantriskcoverage.com/account/policies/">
            {t("common.sidebar.applicationHistory")}
          </a>
        </li>
        <li className="mt-2">
          <Link
            to={ROUTES.SIGNIN}
            className="text-base font-bold text-secondary underline decoration-1 underline-offset-1 lg:hidden"
          >
            {t("common.signout")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarProfile;
