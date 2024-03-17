import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import useToggle from "@/hooks/useToggle";
import hamburger from "@/assets/icons/hamburger.svg";
import BypassBlock from "@/components/BypassBlock";
import { ILayoutProps } from "@/components/Layout/Layout.d";

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  const { t } = useTranslation();
  const [sidebarOpen, toggleSidebarOpen] = useToggle(false);

  return (
    <div className="bg-primary-25">
      <BypassBlock
        bypassLink="main-content"
        bypassStyle="bg-primary text-white"
      />
      <BypassBlock
        bypassLink="footer-content"
        bypassText={t("common.skipToFooter")}
        bypassStyle="bg-primary text-white"
      />

      <main id="main-content" className="bg-primary-25 layout flex flex-col">
        <div className="sticky top-0 z-40">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebarOpen} />
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebarOpen}
          />
        </div>
        <div className="lg:grid lg:grid-cols-[110px_1fr] items-start">
          {/* Sidebar toggle ribbon */}
          <Button
            className="btn-primary hidden lg:flex sticky top-[90px] h-11 items-center rounded-r px-2 mt-2 gap-x-2 ml-auto lg:ml-0 lg:text-lg text-base focus-visible:outline-yellow-400 focus:outline-focus"
            icon={
              <Icon src={hamburger} alt={t("common.iconAltText.hamburger")} width={32} height={24} />
            }
            onClick={toggleSidebarOpen}
          >
            {t("common.menu")}
          </Button>
          <div className="w-full px-4 py-6 lg:py-8 lg:px-9">{children}</div>
        </div>
      </main>
      <Footer
        content={{
          poweredBy: t("footer.poweredBy"),
          body: t("footer.body"),
          privacyPolicy: t("footer.privacyPolicy"),
          copyright: t("footer.copyright"),
          logoAltText: t("common.iconAltText.appLogo"),
        }}
      />
    </div>
  );
};

export default Layout;
