import type { SVGProps } from "react";
const SvgReturn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    role="img"
    {...props}
  >
    <g clipPath="url(#return_svg__a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14.667 6.667 20m0 0L12 25.334M6.667 20h14.667a5.333 5.333 0 0 0 0-10.666H20"
      />
    </g>
    <defs>
      <clipPath id="return_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgReturn;
