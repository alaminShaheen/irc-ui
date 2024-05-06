import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { ISelectDropdownProps } from "@/components/ui/SelectDropdown/SelectDropdown.d";
import Tick from "@/components/AppIcons/Tick";
import UpArrow from "@/components/AppIcons/UpArrow";
import { cn } from "@/utils/helper";

const SelectDropdown = (props: ISelectDropdownProps) => {
  const { options, onChange, value, name, placeholderText, disabled } = props;
  const [, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const onChangeSelectedOption = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <Listbox
      value={value}
      onChange={onChangeSelectedOption}
      name={name}
      data-testid={`${name}-select-dropdown`}
      disabled={disabled}
      defaultValue={value}
    >
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={cn(
              "relative w-full cursor-pointer rounded-lg border-2 border-primary-100 bg-white p-4 px-3 py-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300",
              { "bg-gray-200": disabled },
            )}
          >
            <span
              data-testid="select-dropdown-display"
              className={cn("block truncate", {
                "text-gray-400": !selectedOption?.label,
              })}
            >
              {selectedOption?.label ?? placeholderText}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
              <UpArrow
                className={cn("stroke-primary", {
                  "rotate-180": !open,
                  "opacity-50": disabled,
                })}
                color="#093C55"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none lg:text-base"
              data-testid="select-dropdown-options-wrapper"
            >
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `group relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      index < options.length - 1
                        ? "border-b border-gray-300"
                        : ""
                    } ${active ? "bg-primary text-white" : "text-primary"}`
                  }
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 top-0 flex items-center pl-3">
                          <Tick
                            className={cn(
                              "size-6 stroke-primary group-hover:stroke-white",
                              { "stroke-white": active },
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default SelectDropdown;
