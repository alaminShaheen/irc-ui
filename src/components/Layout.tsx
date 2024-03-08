import { Fragment, ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Fragment>
      <div className="grid grid-cols-[120px_1fr] bg-secondary h-screen p-6">
        <Sidebar/>
        <div className="w-full px-6">
          {children}
        </div>
      </div>

    {/*  Footer goes here*/}
    </Fragment>
  );
};

export default Layout;
