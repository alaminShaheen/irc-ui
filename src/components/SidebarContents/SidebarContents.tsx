import Icon from "@/components/ui/Icon";
import cross from "@/assets/icons/cross.svg";
import Button from "@/components/ui/Button";
import FocusTrap from "@/components/FocusTrap";
import { ISidebarContentProps } from "@/components/SidebarContents/SidebarContents.d";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";

const SidebarContents = (props: ISidebarContentProps) => {
  const { onClose, sidebarOpen, translationContent } = props;
  const {
    close,
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

  return (
    <FocusTrap className="h-full">
      <div className="p-4 lg:p-8 w-[360px] lg:w-[715px] min-h-full text-base-content bg-primary text-left h-full">
        <Button
          className="flex text-white font-semibold items-center gap-x-1 ml-auto btn h-[5%] p-3 text-base"
          icon={<Icon src={cross} alt={close} size={26} className="mr-1" />}
          onClick={onClose}
          variant={ButtonVariant.VANILLA}
          tabIndex={sidebarOpen ? 0 : -1}
          iconPosition={IconPosition.LEFT}
        >
          {close}
        </Button>

        <ul className="overflow-y-auto h-[95%]">
          <li className="pl-0 ml-0 mt-6">
            <div className="text-primary-200 p-0 ml-0" id="policyInfo">
              {policyInformation}
            </div>
            <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="policyInfo"
                >
                  {frequentlyAskedQuestions}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="policyInfo"
                >
                  {policyWording}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="policyInfo"
                >
                  {summaryOfCoverage}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="policyInfo"
                >
                  {activitiesAndEvents}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div className="text-primary-200 pl-0 ml-0 mt-8" id="toolsAndForms">
              {toolsAndForms}
            </div>
            <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="toolsAndForms"
                >
                  {submitExternalCertificate}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="toolsAndForms"
                >
                  {externalCertificate}
                </a>
              </li>
              <li className="cursor-pointer">
                <a
                  href="#"
                  className="hover:underline underline-offset-4"
                  aria-describedby="toolsAndForms"
                >
                  {claimForm}
                </a>
              </li>
            </ul>
          </li>

          <li className="border border-primary-400 my-4" />

          <li className="cursor-pointer text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {importanceOfWaivers}
            </a>
          </li>
          <li className="cursor-pointer mt-4 text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {concussionTraining}
            </a>
          </li>
          <li className="cursor-pointer mt-4 text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {concussionManagement}
            </a>
          </li>
          <li className="cursor-pointer mt-4 text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {waiverOfMinorParticipants}
            </a>
          </li>
          <li className="cursor-pointer mt-4 text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {waiverOfAdultParticipants}
            </a>
          </li>

          <li className="border border-primary-400 my-4" />

          <li className="cursor-pointer text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
              aria-describedby="toolsAndForms"
            >
              {paradeApplicationForm}
            </a>
          </li>
          <li className="cursor-pointer mt-4 text-lg text-white">
            <a
              href="#"
              className="hover:underline underline-offset-4"
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
