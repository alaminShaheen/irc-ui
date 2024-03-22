import { cloneElement, ReactElement, isValidElement } from "react";
import { IIconProps } from "@/components/ui/Icon/Icon.d";

const Icon = (props: IIconProps) => {
  const { src, size = 20, alt, className, ...rest } = props;
  return (
    <>
      {isValidElement(src) ? (
        cloneElement(src as ReactElement, {
          className: className,
          ...rest,
        })
      ) : (
        <img
          className={className}
          src={src as string}
          height={size}
          width={size}
          alt={alt || "icon"}
          {...rest}
        />
      )}
    </>
  );
};

export default Icon;
