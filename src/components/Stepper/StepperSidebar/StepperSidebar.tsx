import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Tick from "@/components/AppIcons/Tick";
import { cn } from "@/utils/helper";
import Return from "@/components/AppIcons/Return";
import { useStepperContext } from "@/context/StepperContext";

const StepperSidebar = () => {
  const { stepperStepInformation: steps, activeStepIndex } =
    useStepperContext();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const completedPercentage = ((activeStepIndex + 1) / steps.length) * 100;

  return (
    <div className="order-1 h-full lg:order-2">
      {/* LG version */}
      <ul
        className="sticky top-[100px] hidden px-14 py-16 text-white lg:block"
        aria-label="progress"
      >
        {steps.map((step, index) => {
          return (
            <Fragment key={step.id}>
              <li
                className={cn(
                  "group transition-all duration-200 hover:rounded-md hover:bg-secondary hover:opacity-100",
                  {
                    "opacity-70": index < activeStepIndex,
                  },
                )}
                aria-current={activeStepIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <Link
                  to={step.route}
                  className="flex cursor-pointer items-center gap-x-3 p-2"
                >
                  <div
                    className={cn(
                      "relative size-10 basis-10 items-center justify-center rounded-full text-lg",
                      {
                        "bg-secondary text-white": index <= activeStepIndex,
                        "border-2 border-dashed border-secondary text-primary":
                          index > activeStepIndex,
                      },
                    )}
                  >
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
                      <Return height={30} width={30} />
                    </Transition>
                    <Transition
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-segoe font-semibold"
                      show={hoveredIndex !== index}
                      enter="transition-opacity ease-linear duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      {index < activeStepIndex ? (
                        <Tick height={24} width={24} className="stroke-white" />
                      ) : (
                        index + 1
                      )}
                    </Transition>
                  </div>
                  <div className="basis-auto text-primary group-hover:text-white">
                    <div
                      className={cn(
                        "font-segoe text-lg font-semibold opacity-95",
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-sm opacity-90">{step.subtitle}</div>
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
                          <div className="absolute h-full w-1 rounded-md bg-primary-100" />
                        </div>
                      ) : (
                        <div
                          className={cn("h-11 w-1 rounded-md", {
                            "bg-secondary": index < activeStepIndex,
                            "bg-primary-100": index > activeStepIndex,
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
      <div className="block text-white lg:hidden" aria-label="progress">
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
