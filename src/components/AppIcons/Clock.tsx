import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
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
      clipPath="url(#clock_svg__a)"
    >
      <path d="M20.931 13.11a9 9 0 1 0-9.453 7.875M20 21l2-2-2-2M17 17l-2 2 2 2" />
      <path d="M12 7v5l2 2" />
    </g>
    <defs>
      <clipPath id="clock_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgClock;
