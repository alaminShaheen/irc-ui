import { MouseEvent, useCallback, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Button from "@/components/ui/Button.tsx";
import SidebarContents from "@/components/Sidebar/SidebarContents.tsx";

const Sidebar = () => {

  const checkboxRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  }, []);

  return (
    <div className="drawer w-full">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={checkboxRef} />
      <div className="drawer-content">
        {/* Page content here */}
        <Button className={"btn-primary flex justify-center items-center rounded-r drawer-button  px-2 py-1 gap-x-2 sticky top-2"}
                onClick={toggleSidebar}>
          <span>Menu</span>
          <RxHamburgerMenu size={25} />
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
