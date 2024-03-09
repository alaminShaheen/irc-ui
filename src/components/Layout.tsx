import { Fragment, ReactNode } from "react";

import Sidebar from "@/components/Sidebar/Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Fragment>
      <div className="lg:grid lg:grid-cols-[120px_1fr] flex flex-col bg-secondary lg:py-3 lg:pr-6">
        <Sidebar/>
        <div className="w-full p-4 lg:px-6 lg:py-8">
          {children}
        </div>
      </div>

    {/*  Footer goes here*/}
    </Fragment>
  );
};

export default Layout;
