import cross from "@/assets/icons/cross.svg";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import FocusTrap from "@/components/FocusTrap";
import { ISidebarContentProps } from "@/components/SidebarContents/SidebarContents.d";
import { ICON_POSITION } from "@/models/enums/ButtonVariant";

const SidebarContents = (props: ISidebarContentProps) => {
  const { onClose, sidebarOpen } = props;

  return (
    <FocusTrap>
      <ul className="p-8 w-[360px] lg:w-[715px] min-h-full text-base-content bg-primary text-left">
        <li className="flex lg:hidden justify-end">
          <Button
            className="text-lg flex text-white font-semibold items-center gap-x-1"
            icon={<Icon src={cross} alt="close" size={26} className="mr-1" />}
            onClick={onClose}
            tabIndex={sidebarOpen ? 0 : -1}
            iconPosition={ICON_POSITION.RIGHT}
          >
            Close
          </Button>
        </li>
        <li className="flex flex-row justify-between w-full pt-10 lg:pt-0">
          <div className="h-12 w-12 rounded-lg text-primary-5 border-2 border-secondary-25 flex justify-center items-center font-bold">
            EN
          </div>

          <Button
            className="text-lg hidden lg:flex text-white font-semibold items-center gap-x-1"
            icon={<Icon src={cross} alt="close" size={26} className="mr-1" />}
            onClick={onClose}
            tabIndex={sidebarOpen ? 0 : -1}
            iconPosition={ICON_POSITION.RIGHT}
          >
            Close
          </Button>
        </li>

        <li className="pl-0 ml-0 mt-6">
          <div className="text-primary-200 p-0 ml-0" id="policyInfo">
            Policy Information
          </div>
          <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="policyInfo"
              >
                Frequently Asked Questions
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="policyInfo"
              >
                Policy Wording
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="policyInfo"
              >
                Summary of Coverage
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="policyInfo"
              >
                Activities & Events
              </a>
            </li>
          </ul>
        </li>

        <li>
          <div className="text-primary-200 pl-0 ml-0 mt-8" id="toolsAndForms">
            Tools & Forms
          </div>
          <ul className="text-left pl-0 ml-0 mt-6 text-lg text-white space-y-4">
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="toolsAndForms"
              >
                Submit External Certificate
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="toolsAndForms"
              >
                External Certificate
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                href="#"
                className="hover:underline underline-offset-4"
                aria-describedby="toolsAndForms"
              >
                Claim Form
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
            Importance of Waivers
          </a>
        </li>
        <li className="cursor-pointer mt-4 text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Concussion Training
          </a>
        </li>
        <li className="cursor-pointer mt-4 text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Concussion Management
          </a>
        </li>
        <li className="cursor-pointer mt-4 text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Waiver of Minor Participants
          </a>
        </li>
        <li className="cursor-pointer mt-4 text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Waiver of Adult Participants
          </a>
        </li>

        <li className="border border-primary-400 my-4" />

        <li className="cursor-pointer text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Parade Application Form
          </a>
        </li>
        <li className="cursor-pointer mt-4 text-lg text-white">
          <a
            href="#"
            className="hover:underline underline-offset-4"
            aria-describedby="toolsAndForms"
          >
            Large Event Application Form
          </a>
        </li>
      </ul>
    </FocusTrap>
  );
};

export default SidebarContents;
