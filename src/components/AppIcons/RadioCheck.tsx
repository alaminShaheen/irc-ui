import type { SVGProps } from "react";
const SvgRadioCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={26}
    fill="none"
    role="img"
    {...props}
  >
    <circle
      cx={12.5}
      cy={13}
      r={11.5}
      fill="#093C55"
      stroke="#093C55"
      strokeWidth={2}
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 13 4.333 4.5L19 8.5"
    />
  </svg>
);
export default SvgRadioCheck;
