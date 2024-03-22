import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import useToggle from "@/hooks/useToggle";
import Hamburger from "../AppIcons/Hamburger";
import BypassBlock from "@/components/BypassBlock";
import { ILayoutProps } from "@/components/Layout/Layout.d";
import { IconPosition } from "@/models/enums/ButtonVariant";

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

      <main id="main-content" className="layout flex flex-col bg-primary-25">
        <div className="sticky top-0 z-40">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebarOpen} />
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebarOpen}
          />
        </div>
        <div className="items-start lg:grid lg:grid-cols-[110px_1fr]">
          {/* Sidebar toggle ribbon */}
          <Button
            className="btn-primary sticky top-[90px] mt-2 hidden h-11 w-auto items-center justify-center gap-x-2 rounded-r-lg p-2 font-segoe text-base !font-semibold focus:outline-focus focus-visible:outline-yellow-400 lg:flex lg:text-lg"
            icon={
              <Icon
                src={<Hamburger />}
                alt={t("common.iconAltText.hamburger")}
                width={32}
                height={25}
              />
            }
            iconPosition={IconPosition.RIGHT}
            onClick={toggleSidebarOpen}
          >
            {t("common.menu")}
          </Button>
          <div className="w-full px-4 py-6 lg:px-9 lg:py-8">{children}</div>
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
