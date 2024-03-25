import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import UpArrow from "@/components/AppIcons/UpArrow";
import StepperSidebar from "@/components/Stepper/StepperSidebar/StepperSidebar";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import { IStepperContainerProps } from "@/components/Stepper/StepperContainer/StepperContainer.d";

const StepperContainer = (props: IStepperContainerProps) => {
  const { steps } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeStepIndex = steps.findIndex(
    (step) => pathname.search(step.route) >= 0,
  );
  const { t } = useTranslation();

  const onConfirm = useCallback(() => {
    navigate(steps[(activeStepIndex + 1) % steps.length].route);
  }, [activeStepIndex, navigate, steps]);

  return (
    <div className="grid h-full grid-rows-[98px_1fr] lg:grid-cols-[1fr_475px] lg:grid-rows-1">
      <div className="order-2 px-4 py-6 lg:order-1 lg:px-9 lg:py-8">
        <Outlet />
        <div className="sticky bottom-[50px] flex gap-x-6">
          <Button
            variant={ButtonVariant.PRIMARY}
            className="flex h-14 w-14 items-center justify-center rounded-md p-0"
            icon={<UpArrow width={27} height={27} />}
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            className="rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
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
