import { Link } from "react-router-dom";
import ROUTES from "@/constants/Routes";
import { useTranslation } from "react-i18next";

interface IProfileAvatar {
  fullName: string;
}

const ProfileAvatar = ({ fullName }: IProfileAvatar) => {
  const { t } = useTranslation();
  const [firstName, lastName] = fullName.split(" ");
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <div className="hidden items-center justify-center gap-x-2 lg:flex">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-xl font-bold text-white">
        <span className="sr-only">{fullName}</span>
        <span aria-hidden={true}>{initials}</span>
      </div>
      <Link
        to={ROUTES.SIGNIN}
        className="text-base font-bold text-secondary underline decoration-1 underline-offset-1"
      >
        {t("common.signout")}
      </Link>
    </div>
  );
};

export default ProfileAvatar;
