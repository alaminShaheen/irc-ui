import { RxHamburgerMenu } from "react-icons/rx";
import { MouseEvent, useCallback, useRef, useState } from "react";
import SidebarContents from "@/components/Sidebar/SidebarContents.tsx";

const Sidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSidebarOpen(prev => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = !prev;
        return !prev;
      }
      return prev;
    });
  }, []);

  return (
    <div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={checkboxRef} />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer"
                 className="btn btn-primary flex items-center gap-2 rounded-l-none drawer-button"
                 onClick={toggleSidebar}>
            Menu
            <RxHamburgerMenu size={30} />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"
                 onClick={toggleSidebar}></label>
          <SidebarContents />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
