import cross from "@/assets/icons/cross.svg";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import FocusTrap from "@/components/FocusTrap";
import { ISidebarContentProps } from "@/components/SidebarContents/SidebarContents.d";

const SidebarContents = (props: ISidebarContentProps) => {
  const { onClose, sidebarOpen } = props;

  return (
    <FocusTrap>
      <ul className="p-8 w-[360px] lg:w-[715px] min-h-full text-base-content bg-primary text-left">
        <li className="flex lg:hidden justify-end">
          <Button className="text-lg flex text-white font-semibold items-center gap-x-1" onClick={onClose}
                  tabIndex={sidebarOpen ? 0 : -1}>
            <span>Close</span>
            <Icon src={cross} alt="close" width={26} height={26} />
          </Button>
        </li>
        <li className="flex flex-row justify-between w-full pt-10 lg:pt-0">
          <div
            className="h-12 w-12 rounded-lg text-primary-5 border-2 border-secondary-25 flex justify-center items-center font-bold">
            EN
          </div>

          <Button className="text-lg hidden lg:flex text-white font-semibold items-center gap-x-1" onClick={onClose}
                  tabIndex={sidebarOpen ? 0 : -1}>
            <span>Close</span>
            <Icon src={cross} alt="close" width={26} height={26} />
          </Button>
        </li>

        <li className="pl-0 ml-0 mt-6">
          <div className="text-primary-200 p-0 ml-0">
            Policy Information
          </div>
          <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
            <li className="cursor-pointer">Frequently Asked Questions</li>
            <li className="cursor-pointer">Policy Wording</li>
            <li className="cursor-pointer">Summary of Coverage</li>
            <li className="cursor-pointer">Activities & Events</li>
          </ul>
        </li>

        <li>
          <div className="text-primary-200 pl-0 ml-0 mt-8">
            Tools & Forms
          </div>
          <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
            <li className="cursor-pointer">Submit External Certificate</li>
            <li className="cursor-pointer">External Certificate</li>
            <li className="cursor-pointer">Claim Form</li>
          </ul>
        </li>

        <li className="border border-primary-400 my-4" />

        <li className="cursor-pointer text-lg text-white">Importance of Waivers</li>
        <li className="cursor-pointer mt-4 text-lg text-white">Concussion Training</li>
        <li className="cursor-pointer mt-4 text-lg text-white">Concussion Management</li>
        <li className="cursor-pointer mt-4 text-lg text-white">Waiver of Minor Participants</li>
        <li className="cursor-pointer mt-4 text-lg text-white">Waiver of Adult Participants</li>

        <li className="border border-primary-400 my-4" />

        <li className="cursor-pointer text-lg text-white">Parade Application Form</li>
        <li className="cursor-pointer mt-4 text-lg text-white">Large Event Application Form</li>
      </ul>
    </FocusTrap>
  );
};

export default SidebarContents;
