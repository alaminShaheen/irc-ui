import Sidebar from "@/components/Sidebar/Sidebar";
import BypassBlock from "../BypassBlock";
import Footer from "../Footer";
import { ILayoutProps } from "@/components/Layout/Layout.d";

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <div className="bg-primary-25">
      <BypassBlock
        bypassLink="main-content"
        bypassStyle="bg-primary text-white"
      />
      <BypassBlock
        bypassLink="footer-content"
        bypassText="Skip to footer"
        bypassStyle="bg-primary text-white"
      />

      <main
        id="main-content"
        className="lg:grid lg:grid-cols-[110px_1fr] flex flex-col"
      >
        <Sidebar />
        <div className="w-full p-4 lg:p-11">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
