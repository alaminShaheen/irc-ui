import Icon from "@/components/ui/Icon";
import Cross from "../AppIcons/Cross";
import Button from "@/components/ui/Button";
import FocusTrap from "@/components/FocusTrap";
import { ISidebarContentProps } from "@/components/SidebarContents/SidebarContents.d";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "@/constants/Routes";

const SidebarContents = (props: ISidebarContentProps) => {
  const { onClose, sidebarOpen, translationContent } = props;
  const {
    close,
    signout,
    policyInformation,
    frequentlyAskedQuestions,
    policyWording,
    summaryOfCoverage,
    activitiesAndEvents,
    toolsAndForms,
    submitExternalCertificate,
    externalCertificate,
    claimForm,
    importanceOfWaivers,
    concussionTraining,
    concussionManagement,
    waiverOfMinorParticipants,
    waiverOfAdultParticipants,
    paradeApplicationForm,
    largeEventApplicationForm,
  } = translationContent;

  const location = useLocation();
  const path = location.pathname;

  const shouldDisplayAvatar =
    !path.includes("signin") && !path.includes("signup");

  return (
    <FocusTrap className="h-full">
      <div className="text-base-content h-full min-h-full w-[360px] bg-primary p-4 text-left lg:w-[715px] lg:p-8">
        <Button
          className="btn ml-auto flex h-[5%] items-center gap-x-1 p-3 text-base font-semibold text-white"
          icon={<Icon src={<Cross />} alt={close} size={26} className="mr-1" />}
          onClick={onClose}
          variant={ButtonVariant.VANILLA}
          tabIndex={sidebarOpen ? 0 : -1}
          iconPosition={IconPosition.LEFT}
        >
          {close}
        </Button>
        {shouldDisplayAvatar && (
          <Link
            to={ROUTES.SIGNIN}
            className="text-base font-bold text-secondary underline decoration-1 underline-offset-1 lg:hidden"
          >
            {signout}
          </Link>
        )}

        <ul className="h-[95%] overflow-y-auto">
          <li className="ml-0 mt-6 pl-0">
            <div className="ml-0 p-0 text-primary-200" id="policyInfo">
              {policyInformation}
            </div>
            <ul className="ml-0 mt-6 space-y-4 pl-0 text-left text-lg text-white">
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="policyInfo"
                >
                  {frequentlyAskedQuestions}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="policyInfo"
                >
                  {policyWording}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="policyInfo"
                >
                  {summaryOfCoverage}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="policyInfo"
                >
                  {activitiesAndEvents}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div className="ml-0 mt-8 pl-0 text-primary-200" id="toolsAndForms">
              {toolsAndForms}
            </div>
            <ul className="ml-0 mt-6 space-y-4 pl-0 text-left text-lg text-white">
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="toolsAndForms"
                >
                  {submitExternalCertificate}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="toolsAndForms"
                >
                  {externalCertificate}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="underline-offset-4 hover:underline"
                  aria-describedby="toolsAndForms"
                >
                  {claimForm}
                </a>
              </li>
            </ul>
          </li>

          <li className="my-4 border border-primary-400" />

          <li className="cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {importanceOfWaivers}
            </a>
          </li>
          <li className="mt-4 cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {concussionTraining}
            </a>
          </li>
          <li className="mt-4 cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {concussionManagement}
            </a>
          </li>
          <li className="mt-4 cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {waiverOfMinorParticipants}
            </a>
          </li>
          <li className="mt-4 cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {waiverOfAdultParticipants}
            </a>
          </li>

          <li className="my-4 border border-primary-400" />

          <li className="cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {paradeApplicationForm}
            </a>
          </li>
          <li className="mt-4 cursor-pointer text-lg text-white">
            <a
              href="#"
              className="underline-offset-4 hover:underline"
              aria-describedby="toolsAndForms"
            >
              {largeEventApplicationForm}
            </a>
          </li>
        </ul>
      </div>
    </FocusTrap>
  );
};

export default SidebarContents;
