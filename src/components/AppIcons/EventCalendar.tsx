import type { SVGProps } from "react";
const SvgEventCalendar = (props: SVGProps<SVGSVGElement>) => (
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
      clipPath="url(#event-calendar_svg__a)"
    >
      <path d="M6.112 9.333A2.667 2.667 0 0 1 8.78 6.667h16a2.667 2.667 0 0 1 2.667 2.666v16A2.667 2.667 0 0 1 24.779 28h-16a2.667 2.667 0 0 1-2.667-2.667zM22.112 4v5.333M11.446 4v5.333M6.112 14.667h21.334" />
      <path d="M11.446 20h2.667v2.667h-2.667z" />
    </g>
    <defs>
      <clipPath id="event-calendar_svg__a">
        <path fill="#fff" d="M.78 0h32v32h-32z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgEventCalendar;
