import type { SVGProps } from "react";
const SvgCalendar1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#093C55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#calendar-1_svg__a)"
    >
      <path d="M12.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M16 3v4M8 3v4M4 11h12M20 14l2 2h-3M20 18l2-2M19 16a3 3 0 1 0 2 5.236" />
    </g>
    <defs>
      <clipPath id="calendar-1_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCalendar1;
