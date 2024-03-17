import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import appLogo from "@/assets/images/app-logo.png";
import hamburger from "@/assets/icons/hamburger.svg";
import LanguageToggle from "@/components/LanguageToggle";
import { INavbarProps } from "@/components/ui/Navbar/Navbar.d";
import { useTranslation } from "react-i18next";

const Navbar = (props: INavbarProps) => {
  const { toggleSidebar } = props;
  const { t } = useTranslation();

  return (
    <nav className="h-20 bg-primary flex justify-between items-center px-9">
      <div>
        <a href="#">
          <img src={appLogo} alt={t("common.iconAltText.appLogo")} width={40} />
        </a>
      </div>

      <div className="flex items-center gap-x-4">
        <LanguageToggle />
        <Button
          className="btn-primary flex lg:hidden items-center rounded-r px-2 h-auto gap-x-2 text-base focus-visible:outline-yellow-400 focus:outline-focus"
          icon={
            <Icon
              src={hamburger}
              alt={t("iconAltText.hamburger")}
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
