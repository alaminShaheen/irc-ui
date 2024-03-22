import { ReactNode, ImgHTMLAttributes } from "react";

export interface IIconProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | ReactNode;
  size?: number;
  className?: string;
}
