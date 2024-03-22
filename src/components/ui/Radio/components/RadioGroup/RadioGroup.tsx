import { Controller } from "react-hook-form";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/utils/helper";
import RadioButton from "@/components/ui/Radio/components/RadioButton";
import { IRadioGroupProps } from "@/components/ui/Radio/components/RadioGroup/RadioGroup.d";

const RadioGroup = (props: IRadioGroupProps) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const selector = useRef<HTMLDivElement>(null);

  const slideWindow = useCallback(() => {
    if (refs.current && refs.current.length > 0) {
      let leftPosition = 0;
      let topPosition = 0;

      // check if radio buttons are vertically arranged
      const radioButtonsArrangedVertical =
        refs.current[0]?.offsetLeft === refs.current[1]?.offsetLeft;

      for (let index = 0; index < props.radioProps.length; index++) {
        if (props.radioProps[index].checked) {
          // set slider width & height to width & height of selected radio button
          selector.current!.style.width =
            refs.current[index]!.clientWidth + "px";
          selector.current!.style.height =
            refs.current[index]!.clientHeight + "px";

          // set slider position to position of selected radio button
          if (radioButtonsArrangedVertical) {
            selector.current!.style.top = topPosition + "px";
            selector.current!.style.left =
              refs.current[index]!.offsetLeft + "px";
          } else {
            selector.current!.style.left = leftPosition + "px";
            selector.current!.style.top = refs.current[index]!.offsetTop + "px";
          }
          break;
        } else {
          // find correct position of slider
          if (radioButtonsArrangedVertical) {
            topPosition += refs.current[index]!.clientHeight + 16;
          } else {
            leftPosition += refs.current[index]!.clientWidth + 16;
          }
        }
      }
    }
  }, [props.radioProps]);

  useEffect(() => {
    slideWindow();
  }, [slideWindow]);

  return (
    <div className="lg-gap-y-0 relative flex flex-col items-start gap-y-4 lg:flex-row lg:items-baseline lg:gap-x-4">
      <div
        className={cn(
          "absolute left-0 top-0 z-10 rounded-md border-2 transition-all duration-500 ease-in-out",
          {
            "border-primary": props.radioProps.some((radio) => radio.checked),
          },
        )}
        ref={selector}
      />
      {props.radioProps.map((radio, index) => {
        return (
          <span key={index} ref={(element) => refs.current.push(element)}>
            <Controller
              render={({ field: { onChange, value, ref, name } }) => (
                <RadioButton
                  value={radio.value}
                  label={radio.label}
                  onChange={onChange}
                  ref={ref}
                  name={name}
                  id={radio.id}
                  checked={value === radio.value}
                />
              )}
              name={props.name}
            />
          </span>
        );
      })}
    </div>
  );
};

export default RadioGroup;
