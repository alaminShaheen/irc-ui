import Sidebar from "@/components/Sidebar/Sidebar";
import BypassBlock from "../BypassBlock";
import { ILayoutProps } from "@/components/Layout/Layout.d";

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <>
      <BypassBlock
        bypassLink="main-content"
        bypassStyle="bg-primary text-white"
      />
      <BypassBlock
        bypassLink="footer-content"
        bypassText="Skip to footer"
        bypassStyle="bg-primary text-white"
      />

      <div
        id="main-content"
        className="lg:grid lg:grid-cols-[110px_1fr] flex flex-col bg-primary-25"
      >
        <Sidebar />
        <div className="w-full p-4 lg:p-11">{children}</div>
      </div>

      {/*  Footer goes here*/}
    </>
  );
};

export default Layout;
