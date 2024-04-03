import type { SVGProps } from "react";
const SvgSmallTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    role="img"
    {...props}
  >
    <rect
      width={15.731}
      height={16}
      x={1}
      y={1}
      fill="#093C55"
      stroke="#093C55"
      strokeWidth={2}
      rx={7.866}
    />
    <path
      stroke="#FAFBFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5.4 8.7 2.4 2.7L12.6 6"
    />
  </svg>
);
export default SvgSmallTick;
