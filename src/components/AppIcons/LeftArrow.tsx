import type { SVGProps } from "react";
const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    role="img"
    {...props}
  >
    <path
      stroke={props.color ?? "#093C55"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12.5H5M11 18.5l-6-6M11 6.5l-6 6"
    />
  </svg>
);
export default SvgLeftArrow;
