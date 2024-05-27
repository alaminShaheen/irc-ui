import { Outlet } from "react-router-dom";

import StepperSidebar from "@/components/Stepper/StepperSidebar/StepperSidebar";
import HubspotChatContainer from "@/components/HubspotChatContainer/HubspotChatContainer";
import { StepperContextProvider } from "@/context/StepperContext";

const StepperContainer = () => {
  return (
    <StepperContextProvider>
      <div className="flex size-full flex-col-reverse lg:flex-row lg:justify-center">
        <div className="lg:my-0 lg:px-9 lg:py-8">
          <Outlet />
        </div>
        <StepperSidebar />
        <HubspotChatContainer />
      </div>
    </StepperContextProvider>
  );
};

export default StepperContainer;
