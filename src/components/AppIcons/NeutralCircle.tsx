import type { SVGProps } from "react";
const SvgNeutralCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    role="img"
    {...props}
  >
    <rect
      width={15.731}
      height={16}
      x={1.73}
      y={1}
      fill="#B5C4CC"
      stroke="#B5C4CC"
      strokeWidth={2}
      rx={7.866}
    />
  </svg>
);
export default SvgNeutralCircle;
