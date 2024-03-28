import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/Sidebar";
import useToggle from "@/hooks/useToggle";
import BypassBlock from "@/components/BypassBlock";
import { ILayoutProps } from "@/components/Layout/Layout.d";

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  const { t } = useTranslation();
  const [sidebarOpen, toggleSidebarOpen] = useToggle(false);

  return (
    <div className="flex min-h-screen flex-col bg-primary-25">
      <BypassBlock
        bypassLink="main-content"
        bypassStyle="bg-primary text-white"
      />
      <BypassBlock
        bypassLink="footer-content"
        bypassText={t("common.skipToFooter")}
        bypassStyle="bg-primary text-white"
      />
      <main
        id="main-content"
        className="layout flex flex-grow flex-col bg-primary-25"
      >
        <div className="sticky top-0 z-40">
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebarOpen} />
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebarOpen}
          />
        </div>
        <div className="w-full flex-grow">{children}</div>
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
