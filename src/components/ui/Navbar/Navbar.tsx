import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import appLogo from "@/assets/images/app-logo.png";
import hamburger from "@/assets/icons/hamburger.svg";
import LanguageToggle from "@/components/LanguageToggle";
import { INavbarProps } from "@/components/ui/Navbar/Navbar.d";

const Navbar = (props: INavbarProps) => {
  const { menuText = "Menu", toggleSidebar } = props;

  return (
    <nav className="h-20 bg-primary flex justify-between items-center px-9">
      <div>
        <a href="#">
          <img src={appLogo} alt="App Logo" width={40} />
        </a>
      </div>

      <div className="flex items-center gap-x-4">
        <LanguageToggle />
        <Button
          className="btn-primary flex lg:hidden items-center rounded-r px-2 h-auto gap-x-2 text-base focus-visible:outline-yellow-400 focus:outline-focus"
          icon={<Icon src={hamburger} alt="hamburger" width={32} height={24} />}
          onClick={toggleSidebar}
        >
          {menuText}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;