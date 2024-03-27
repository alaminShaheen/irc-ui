import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Tick from "@/components/AppIcons/Tick";
import { cn } from "@/utils/helper";
import Return from "@/components/AppIcons/Return";
import { IStepperSidebar } from "@/components/Stepper/StepperSidebar/StepperSidebar.d";

const StepperSidebar = (props: IStepperSidebar) => {
  const { steps, className, activeStepIndex } = props;
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const completedPercentage = ((activeStepIndex + 1) / steps.length) * 100;



  return (
    <div className={cn("h-full bg-primary", className)}>
      {/* LG version */}
      <ul className="sticky top-[100px] hidden p-16 text-white lg:block">
        {steps.map((step, index) => {
          return (
            <Fragment key={step.title}>
              <li
                className={cn(
                  "transition-all duration-200 hover:rounded-md hover:bg-secondary hover:opacity-100",
                  {
                    "opacity-70": index < activeStepIndex,
                  },
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <Link
                  to={step.route}
                  className="flex cursor-pointer items-center gap-x-3 p-2"
                >
                  <div className="relative h-10 w-10 items-center justify-center rounded-full bg-secondary text-xl">
                    <Transition
                      show={hoveredIndex === index}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                      enter="transition-opacity ease-linear duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Return />
                    </Transition>
                    <Transition
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                      show={hoveredIndex !== index}
                      enter="transition-opacity ease-linear duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      {index < activeStepIndex ? <Tick /> : index + 1}
                    </Transition>
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
                          <div className="absolute z-10 h-1/2 w-1 rounded-md bg-secondary transition-all duration-500" />
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

      {/* SM, MD version */}
      <div className="block text-white lg:hidden">
        <div className="progress-bar relative h-1 w-full">
          <div className="absolute h-full w-full bg-white" />
          <div
            className="absolute h-full bg-secondary transition-all duration-500"
            style={{ width: `${completedPercentage}%` }}
          />
        </div>
        <div className="progress-info flex items-center gap-x-3 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-base">
            {`${activeStepIndex + 1}/${steps.length}`}
          </div>
          <div>
            <div className="text-xl">{steps[activeStepIndex].title}</div>
            <div className="text-sm">{steps[activeStepIndex].subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperSidebar;
