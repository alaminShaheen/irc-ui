import { MouseEvent, useCallback, useRef } from "react";
import hamburger from "@/assets/icons/hamburger.svg";

import Button from "@/components/ui/Button/Button";
import SidebarContents from "@/components/Sidebar/SidebarContents";

const Sidebar = () => {

  const checkboxRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  }, []);

  return (
    <div
      className="drawer w-full bg-primary lg:bg-transparent h-20 lg:h-auto sticky lg:static top-0 lg:top-auto p-4 lg:p-0 z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={checkboxRef} />
      <div className="drawer-content flex lg:block">
        {/* Page content here */}
        <Button
          className="btn-primary flex justify-center items-center rounded-r drawer-button px-2 py-4 gap-x-2 sticky top-2 ml-auto lg:ml-0 w-auto lg:w-full h-11 lg:text-lg text-base"
          onClick={toggleSidebar}>
          <span>Menu</span>
          <img src={hamburger} alt="hamburger" width={32} height={24} />
        </Button>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"
               onClick={toggleSidebar}></label>
        <SidebarContents />
      </div>
    </div>
  );
};

export default Sidebar;
