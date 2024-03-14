import Icon from "@/components/ui/Icon";
import cross from "@/assets/icons/cross.svg";
import Button from "@/components/ui/Button";
import FocusTrap from "@/components/FocusTrap";
import { ISidebarContentProps } from "@/components/SidebarContents/SidebarContents.d";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";
import { useEffect, useRef } from "react";

const SidebarContents = (props: ISidebarContentProps) => {
  const { onClose, sidebarOpen } = props;
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <FocusTrap className="h-full">
      <div className="p-4 lg:p-8 w-[360px] lg:w-[715px] min-h-full text-base-content bg-primary text-left h-full">
        <Button
          className="flex text-white font-semibold items-center gap-x-1 ml-auto btn h-[5%] p-3 text-base"
          icon={<Icon src={cross} alt="close" size={26} className="mr-1" />}
          onClick={onClose}
          ref={ref}
          variant={ButtonVariant.VANILLA}
          tabIndex={sidebarOpen ? 0 : -1}
          iconPosition={IconPosition.LEFT}
        >
          Close
        </Button>

        <ul className="overflow-y-auto h-[95%]">
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
      </div>
    </FocusTrap>
  );
};

export default SidebarContents;
