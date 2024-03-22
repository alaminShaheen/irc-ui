import type { SVGProps } from "react";
const SvgTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={23}
    fill="none"
    role="img"
    {...props}
  >
    <g clipPath="url(#tick_svg__a)">
      <path
        stroke="#FAFBFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="m5 11.5 5 4.792 10-9.584"
      />
    </g>
    <defs>
      <clipPath id="tick_svg__a">
        <path fill="#fff" d="M0 0h24v23H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTick;
