import { forwardRef } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import radioCheck from "@/assets/icons/radio-check.svg";
import { IRadioButtonProps } from "@/components/ui/Radio/components/RadioButton/RadioButton.d";

const RadioButton = forwardRef<HTMLInputElement, IRadioButtonProps>(
  (props, ref) => {
    const { label, ...rest } = props;
    const { t } = useTranslation();

    return (
      <span
        className={cn(
          "relative flex w-auto gap-x-3 rounded-md border-2 border-primary-50 bg-white px-4 py-3",
          {
            "bg-primary-50": rest.checked,
          },
        )}
      >
        <span
          className={cn(
            "h-6 w-6 rounded-full border border-graphite-300 focus:outline-focus focus-visible:outline-yellow-400",
          )}
        >
          <Transition
            show={rest.checked}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-400"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Icon
              tabIndex={0}
              src={radioCheck}
              alt={t("common.iconAltText.checked")}
              size={24}
              className="rounded-full focus:outline-focus focus-visible:outline-yellow-400"
            />
          </Transition>
        </span>
        <input
          {...rest}
          type="radio"
          checked={rest.checked}
          tabIndex={-1}
          className={cn(
            rest.className,
            "absolute left-0 top-0 h-full w-full cursor-pointer opacity-0",
          )}
          ref={ref}
        />
        <label htmlFor={rest.id}>{label}</label>
      </span>
    );
  },
);

RadioButton.displayName = "RadioButton";

export default RadioButton;
