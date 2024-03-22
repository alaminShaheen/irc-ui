import { IIconProps } from "@/components/ui/Icon/Icon.d";

const Icon = (props: IIconProps) => {
  const { size = 20, alt, ...rest } = props;
  return <img {...rest} height={size} width={size} alt={alt || "icon"} />;
};

export default Icon;
