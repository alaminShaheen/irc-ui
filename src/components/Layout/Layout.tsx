import { Fragment } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import { ILayoutProps } from "@/components/Layout/Layout.d";


const Layout = (props: ILayoutProps) => {
  const { children } = props;
  return (
    <Fragment>
      <div className="lg:grid lg:grid-cols-[110px_1fr] flex flex-col bg-primary-25">
        <Sidebar />
        <div className="w-full p-4 lg:p-11">
          {children}
        </div>
      </div>

      {/*  Footer goes here*/}
    </Fragment>
  );
};

export default Layout;
