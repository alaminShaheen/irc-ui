import { Fragment, ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Fragment>
      <div className="lg:grid lg:grid-cols-[120px_1fr] sm:flex sm:flex-col bg-secondary py-3 pr-6">
        <Sidebar/>
        <div className="w-full px-6 py-8">
          {children}
        </div>
      </div>

    {/*  Footer goes here*/}
    </Fragment>
  );
};

export default Layout;
