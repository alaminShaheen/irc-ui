import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import SidebarContents from "@/components/SidebarContents";
import { ISidebarProps } from "@/components/Sidebar/Sidebar.d";
import useDisableBodyScroll from "@/hooks/useDisableBodyScroll";

const Sidebar = (props: ISidebarProps) => {
  const { sidebarOpen, toggleSidebar } = props;
  useDisableBodyScroll(sidebarOpen);
  const { t } = useTranslation();

  const sidebarTranslationContent = {
    close: t("common.close"),
    policyInformation: t("common.sidebar.policyInformation"),
    frequentlyAskedQuestions: t("common.sidebar.frequentlyAskedQuestions"),
    policyWording: t("common.sidebar.policyWording"),
    summaryOfCoverage: t("common.sidebar.summaryOfCoverage"),
    activitiesAndEvents: t("common.sidebar.activitiesAndEvents"),
    toolsAndForms: t("common.sidebar.toolsAndForms"),
    submitExternalCertificate: t("common.sidebar.submitExternalCertificate"),
    externalCertificate: t("common.sidebar.externalCertificate"),
    claimForm: t("common.sidebar.claimForm"),
    importanceOfWaivers: t("common.sidebar.importanceOfWaivers"),
    concussionTraining: t("common.sidebar.concussionTraining"),
    concussionManagement: t("common.sidebar.concussionManagement"),
    waiverOfMinorParticipants: t("common.sidebar.waiverOfMinorParticipants"),
    waiverOfAdultParticipants: t("common.sidebar.waiverOfAdultParticipants"),
    paradeApplicationForm: t("common.sidebar.paradeApplicationForm"),
    largeEventApplicationForm: t("common.sidebar.largeEventApplicationForm"),
  };

  return (
    <Transition show={sidebarOpen} className="absolute right-0 top-0">
      {/* Background overlay */}
      <Transition.Child
        enter="transition-opacity ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="overlay fixed right-0 top-0 z-10 h-full w-full cursor-pointer bg-black/40"
          onClick={toggleSidebar}
          data-testid="overlay"
        />
      </Transition.Child>

      {/* Sliding sidebar */}
      <Transition.Child
        className="fixed right-0 z-20 h-screen"
        enter="transition ease-in-out duration-500 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <SidebarContents
          sidebarOpen={sidebarOpen}
          onClose={toggleSidebar}
          translationContent={sidebarTranslationContent}
        />
      </Transition.Child>
    </Transition>
  );
};

export default Sidebar;
