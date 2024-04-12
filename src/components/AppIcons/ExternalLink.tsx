import type { SVGProps } from "react";
const SvgExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={28}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#093C55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      clipPath="url(#external-link_svg__a)"
    >
      <path d="M14.552 7h-7A2.333 2.333 0 0 0 5.22 9.333V21a2.333 2.333 0 0 0 2.333 2.333H19.22A2.333 2.333 0 0 0 21.552 21v-7M13.387 15.166l10.5-10.5M18.053 4.667h5.833V10.5" />
    </g>
    <defs>
      <clipPath id="external-link_svg__a">
        <path fill="#fff" d="M.553 0h28v28h-28z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgExternalLink;
