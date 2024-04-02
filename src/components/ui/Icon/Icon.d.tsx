import { ReactNode, ImgHTMLAttributes } from "react";

export interface IIconProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | ReactNode | JSX.Element;
  size?: number;
  className?: string;
}
