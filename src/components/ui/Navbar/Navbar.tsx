import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import BrokerLinkLogo from "@/components/AppIcons/BrokerLinkLogo";
import Hamburger from "@/components/AppIcons/Hamburger";
import LanguageToggle from "@/components/LanguageToggle";
import { INavbarProps } from "@/components/ui/Navbar/Navbar.d";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";

const Navbar = (props: INavbarProps) => {
  const { toggleSidebar } = props;
  const { t } = useTranslation();

  const location = useLocation();
  const path = location.pathname;

  const shouldDisplayAvatar =
    !path.includes("signin") && !path.includes("signup");

  return (
    <nav className="flex h-navbar items-center justify-between bg-primary px-6 md:px-9">
      <div>
        <a href="#">
          <Icon
            src={<BrokerLinkLogo />}
            alt={t("common.iconAltText.appLogo")}
            size={136}
          />
        </a>
      </div>

      <div className="flex items-center gap-x-6">
        {shouldDisplayAvatar && <ProfileAvatar fullName="John Doe" />}
        <LanguageToggle />
        <Button
          className="btn-primary flex h-auto items-center gap-x-2 rounded-r px-2 text-base focus:outline-focus focus-visible:outline-yellow-400"
          icon={
            <Icon
              src={<Hamburger />}
              alt={t("common.iconAltText.hamburger")}
              width={32}
              height={24}
            />
          }
          onClick={toggleSidebar}
        >
          {t("common.menu")}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
