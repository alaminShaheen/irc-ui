import { MouseEvent, useCallback } from "react";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import useToggle from "@/hooks/useToggle";
import hamburger from "@/assets/icons/hamburger.svg";
import { Transition } from "@headlessui/react";
import SidebarContents from "@/components/SidebarContents";
import useDisableBodyScroll from "@/hooks/useDisableBodyScroll";

const Sidebar = () => {
  const [sidebarOpen, toggleSidebarOpen] = useToggle(false);
  useDisableBodyScroll(sidebarOpen);

  const toggleSidebar = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    toggleSidebarOpen();
  }, [toggleSidebarOpen]);

  return (
    <div
      className="w-full bg-primary lg:bg-transparent h-20 lg:h-auto sticky lg:static top-0 lg:top-auto p-4 lg:p-0 z-50 flex items-center">
      <Button
        className="btn-primary flex items-center rounded-r px-2 static lg:fixed py-4 gap-x-2 top-2 ml-auto lg:ml-0 w-auto h-11 lg:text-lg text-base focus-visible:outline-yellow-400 focus:outline-focus"
        icon={<Icon src={hamburger} alt="hamburger" width={32} height={24} />}
        onClick={toggleSidebar}>
        Menu
      </Button>

      <Transition show={sidebarOpen} className="absolute left-0 top-0">
        {/* Background overlay */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="overlay h-full w-full fixed top-0 cursor-pointer left-0 z-10 bg-black/40"
               onClick={toggleSidebar} />
        </Transition.Child>

        {/* Sliding sidebar */}
        <Transition.Child
          className="relative z-20 h-screen"
          enter="transition ease-in-out duration-400 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-400 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full">
          <SidebarContents sidebarOpen={sidebarOpen} onClose={toggleSidebar} />
        </Transition.Child>
      </Transition>

    </div>
  );
};

export default Sidebar;
