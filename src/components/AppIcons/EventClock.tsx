import type { SVGProps } from "react";
const SvgEventClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#093C55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#event-clock_svg__a)"
    >
      <path d="M4.08 16a12 12 0 1 0 24 0 12 12 0 0 0-24 0" />
      <path d="M16.08 9.334V16l4 4" />
    </g>
    <defs>
      <clipPath id="event-clock_svg__a">
        <path fill="#fff" d="M.08 0h32v32h-32z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgEventClock;
