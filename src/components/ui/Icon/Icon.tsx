import { cloneElement, isValidElement } from "react";
import { IIconProps } from "@/components/ui/Icon/Icon.d";

const Icon = (props: IIconProps) => {
  const { src, size = 20, alt, ...rest } = props;
  return (
    <>
      {isValidElement(src) ? (
        cloneElement(src)
      ) : (
        <img
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
