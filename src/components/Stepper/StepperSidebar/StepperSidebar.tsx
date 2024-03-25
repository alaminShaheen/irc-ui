import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import Tick from "@/components/AppIcons/Tick";
import { cn } from "@/utils/helper";
import { IStepperSidebar } from "@/components/Stepper/StepperSidebar/StepperSidebar.d";

const StepperSidebar = (props: IStepperSidebar) => {
  const { steps } = props;
  const { pathname } = useLocation();
  const activeStepIndex = steps.findIndex(
    (step) => pathname.search(step.route) >= 0,
  );

  return (
    <div className="h-full bg-primary">
      <ul className="sticky top-[100px] p-16 text-white">
        {steps.map((step, index) => {
          return (
            <Fragment key={step.title}>
              <li className="w-full">
                <Link
                  to={step.route}
                  className="flex cursor-pointer items-center gap-x-3 p-2"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-xl",
                      {
                        "bg-secondary": index <= activeStepIndex,
                        "border border-dashed border-secondary":
                          index > activeStepIndex,
                      },
                    )}
                  >
                    {index < activeStepIndex ? <Tick /> : index + 1}
                  </div>
                  <div>
                    <div className="text-xl">{step.title}</div>
                    <div className="text-sm">{step.subtitle}</div>
                  </div>
                </Link>
              </li>
              {index < steps.length - 1 && (
                <li className="my-2 px-2">
                  <div className="flex h-11 w-10 justify-center">
                    {index < steps.length - 1 &&
                      (index === activeStepIndex ? (
                        <div className="relative h-11 w-1">
                          <div className="absolute z-10 h-6 w-1 rounded-md bg-secondary" />
                          <div className="absolute h-full w-1 rounded-md bg-white" />
                        </div>
                      ) : (
                        <div
                          className={cn("h-11 w-1 rounded-md", {
                            "bg-secondary": index < activeStepIndex,
                            "bg-white": index > activeStepIndex,
                          })}
                        />
                      ))}
                  </div>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default StepperSidebar;
