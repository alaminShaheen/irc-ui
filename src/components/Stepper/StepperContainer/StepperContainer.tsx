import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import StepperSidebar from "@/components/Stepper/StepperSidebar/StepperSidebar";
import { IStepperContainerProps } from "@/components/Stepper/StepperContainer/StepperContainer.d";

const StepperContainer = (props: IStepperContainerProps) => {
  const { steps } = props;
  const { t } = useTranslation();

  return (
    <div className="grid h-full grid-cols-[1fr_475px]">
      <div className="flex flex-col gap-x-6 px-4 py-6 lg:px-9 lg:py-8">
        <Outlet />
      </div>
      <StepperSidebar steps={steps} />
    </div>
  );
};

export default StepperContainer;
