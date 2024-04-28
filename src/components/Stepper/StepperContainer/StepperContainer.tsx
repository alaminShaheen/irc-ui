import { Outlet } from "react-router-dom";

import StepperSidebar from "@/components/Stepper/StepperSidebar/StepperSidebar";
import { StepperContextProvider } from "@/context/StepperContext";

const StepperContainer = () => {
  return (
    <StepperContextProvider>
      <div className="mx-auto grid h-full w-11/12 grid-rows-[98px_1fr] lg:grid-cols-[1fr_600px] lg:grid-rows-1">
        <div className="order-2 px-4 py-6 lg:order-1 lg:px-9 lg:py-8">
          <Outlet />
        </div>
        <StepperSidebar />
      </div>
    </StepperContextProvider>
  );
};

export default StepperContainer;
