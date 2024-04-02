import type { SVGProps } from "react";
const SvgAllInOneIcon = (props: SVGProps<SVGSVGElement>) => (
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
      clipPath="url(#all-in-one-icon_svg__a)"
    >
      <path d="M7.5 18h-3L18 4.5 31.5 18h-3M7.5 18v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V18" />
      <path d="M15 18h6v6h-6z" />
    </g>
    <defs>
      <clipPath id="all-in-one-icon_svg__a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAllInOneIcon;
