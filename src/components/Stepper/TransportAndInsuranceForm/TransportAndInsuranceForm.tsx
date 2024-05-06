import { useStepperContext } from "@/context/StepperContext";
import { useEffect } from "react";

const TransportAndInsuranceForm = () => {
  const { switchRoute, changingRouteTo } = useStepperContext();

  useEffect(() => {
    if (changingRouteTo) {
      switchRoute();
    }
  }, [changingRouteTo, switchRoute]);

  return <div className="h-screen">Transport & Insurance Form</div>;
};

export default TransportAndInsuranceForm;
