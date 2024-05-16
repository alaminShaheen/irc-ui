import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import Tick from "@/components/AppIcons/Tick";
import { cn } from "@/utils/helper";
import Return from "@/components/AppIcons/Return";
import { useStepperContext } from "@/context/StepperContext";
import Button from "@/components/ui/Button";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const StepperSidebar = () => {
  const {
    stepperStepInformation: steps,
    currentStepIndex,
    changeRouteTo,
  } = useStepperContext();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const completedPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    setActiveStepIndex((prev) => Math.max(prev, currentStepIndex));
  }, [currentStepIndex]);

  return (
    <div>
      {/* LG version */}
      <ul
        className="sticky top-[100px] hidden px-14 py-16 text-white lg:block"
        aria-label="progress"
      >
        {steps.map((step, index) => {
          return (
            <Fragment key={`${step.title}-${step.id}`}>
              <li
                className={cn("group transition-all duration-200", {
                  "opacity-70": index < currentStepIndex,
                  "hover:rounded-md hover:bg-secondary hover:opacity-100":
                    index <= activeStepIndex,
                })}
                aria-current={currentStepIndex === index}
                onMouseEnter={() => {
                  if (index <= activeStepIndex) {
                    setHoveredIndex(index);
                  }
                }}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <Button
                  disabled={index > activeStepIndex}
                  variant={ButtonVariant.TRANSPARENT}
                  onClick={() => changeRouteTo(index)}
                  className="flex cursor-pointer items-center justify-start gap-x-3 !border-0 p-2"
                >
                  <div
                    className={cn(
                      "relative size-10 shrink-0 items-center justify-center rounded-full text-lg",
                      {
                        "bg-secondary text-white": index <= currentStepIndex,
                        "border-2 border-dashed border-secondary text-primary":
                          index > currentStepIndex,
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
                      {index < activeStepIndex ? (
                        <Return height={30} width={30} />
                      ) : (
                        <span className="font-segoe font-semibold">
                          {index + 1}
                        </span>
                      )}
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
                      {index < currentStepIndex ? (
                        <Tick height={24} width={24} className="stroke-white" />
                      ) : (
                        index + 1
                      )}
                    </Transition>
                  </div>
                  <div
                    className={cn("text-left text-primary", {
                      "group-hover:text-white": index <= activeStepIndex,
                    })}
                  >
                    <div
                      className={cn(
                        "font-segoe text-lg font-semibold opacity-95",
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-sm opacity-90">{step.subtitle}</div>
                  </div>
                </Button>
              </li>
              {index < steps.length - 1 && (
                <li className="my-2 px-2">
                  <div className="flex h-11 w-10 justify-center">
                    {index < steps.length - 1 &&
                      (index === currentStepIndex ? (
                        <div className="relative h-11 w-1">
                          <div className="absolute z-10 h-1/2 w-1 rounded-md bg-secondary transition-all duration-500" />
                          <div className="absolute h-full w-1 rounded-md bg-primary-100" />
                        </div>
                      ) : (
                        <div
                          className={cn("h-11 w-1 rounded-md", {
                            "bg-secondary": index < currentStepIndex,
                            "bg-primary-100": index > currentStepIndex,
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
      <div
        className="block bg-primary text-white lg:hidden"
        aria-label="progress"
      >
        <div className="progress-bar relative h-1 w-full">
          <div className="absolute h-full w-full bg-white" />
          <div
            className="absolute h-full bg-secondary transition-all duration-500"
            style={{ width: `${completedPercentage}%` }}
          />
        </div>
        <div className="progress-info flex items-center gap-x-3 px-4 pb-5 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-base">
            {`${currentStepIndex + 1}/${steps.length}`}
          </div>
          <div className="text-xl">{steps[currentStepIndex].title}</div>
        </div>
      </div>
    </div>
  );
};

export default StepperSidebar;
