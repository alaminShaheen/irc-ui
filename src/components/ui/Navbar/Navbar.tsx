import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import appLogo from "@/assets/images/app-logo-alternate.png";
import Hamburger from "../../AppIcons/Hamburger";
import LanguageToggle from "@/components/LanguageToggle";
import { INavbarProps } from "@/components/ui/Navbar/Navbar.d";

const Navbar = (props: INavbarProps) => {
  const { toggleSidebar } = props;
  const { t } = useTranslation();

  return (
    <nav className="flex h-navbar items-center justify-between bg-primary px-9">
      <div>
        <a href="#">
          {/* <img src={appLogo} alt={t("common.iconAltText.appLogo")} width={40} /> */}
          <Icon src={appLogo} alt={t("common.iconAltText.appLogo")} size={40} />
        </a>
      </div>

      <div className="flex items-center gap-x-4">
        <LanguageToggle />
        <Button
          className="btn-primary flex h-auto items-center gap-x-2 rounded-r px-2 text-base focus:outline-focus focus-visible:outline-yellow-400 lg:hidden"
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
