import type { SVGProps } from "react";
const SvgAlertInfoOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#1B1B1B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#alert-info-outline_svg__a)"
      opacity={0.6}
    >
      <path d="M3 12a9 9 0 1 0 18.001 0A9 9 0 0 0 3 12M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </g>
    <defs>
      <clipPath id="alert-info-outline_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAlertInfoOutline;
