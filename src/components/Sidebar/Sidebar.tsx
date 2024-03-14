import { Transition } from "@headlessui/react";

import SidebarContents from "@/components/SidebarContents";
import { ISidebarProps } from "@/components/Sidebar/Sidebar.d";
import useDisableBodyScroll from "@/hooks/useDisableBodyScroll";

const Sidebar = (props: ISidebarProps) => {
  const { sidebarOpen, toggleSidebar } = props;
  useDisableBodyScroll(sidebarOpen);

  return (
    <Transition show={sidebarOpen} className="absolute left-0 top-0">
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="overlay h-full w-full fixed top-0 cursor-pointer left-0 z-10 bg-black/40"
          onClick={toggleSidebar}
        />
      </Transition.Child>

      {/* Sliding sidebar */}
      <Transition.Child
        className="fixed z-20 h-screen"
        enter="transition ease-in-out duration-400 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-400 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SidebarContents sidebarOpen={sidebarOpen} onClose={toggleSidebar} />
      </Transition.Child>
    </Transition>
  );
};

export default Sidebar;
