import { Outlet, useLocation } from "react-router-dom";

import StepperSidebar from "@/components/Stepper/StepperSidebar/StepperSidebar";
import { IStepperContainerProps } from "@/components/Stepper/StepperContainer/StepperContainer.d";

const StepperContainer = (props: IStepperContainerProps) => {
  const { steps } = props;
  const { pathname } = useLocation();
  const activeStepIndex = Math.max(
    steps.findIndex((step) => pathname.search(step.route) >= 0),
    0,
  );

  return (
    <div className="mx-auto grid h-full w-11/12 grid-rows-[98px_1fr] lg:grid-cols-[1fr_600px] lg:grid-rows-1">
      <div className="order-2 px-4 py-6 lg:order-1 lg:px-9 lg:py-8">
        <Outlet />
      </div>
      <StepperSidebar
        activeStepIndex={activeStepIndex}
        steps={steps}
        className="order-1 lg:order-2"
      />
    </div>
  );
};

export default StepperContainer;
