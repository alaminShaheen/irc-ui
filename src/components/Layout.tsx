import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Sidebar/>
      {children}
    </div>
  );
};

export default Layout;
