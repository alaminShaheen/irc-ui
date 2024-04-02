import type { SVGProps } from "react";
const SvgSpeedometerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#093C55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#speedometer-icon_svg__a)"
    >
      <path d="M6 19.5A12 12 0 0 1 16.5 30a9 9 0 0 0 4.5-7.5 13.5 13.5 0 0 0 9-12A4.5 4.5 0 0 0 25.5 6a13.5 13.5 0 0 0-12 9A9 9 0 0 0 6 19.5" />
      <path d="M10.501 21a9 9 0 0 0-4.5 9 9 9 0 0 0 9-4.5M21 13.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0" />
    </g>
    <defs>
      <clipPath id="speedometer-icon_svg__a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSpeedometerIcon;
