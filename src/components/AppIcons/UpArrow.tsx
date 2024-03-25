import type { SVGProps } from "react";
const SvgUpArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    role="img"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 19V5M6.5 11l6-6M18.5 11l-6-6"
    />
  </svg>
);
export default SvgUpArrow;
