import type { SVGProps } from "react";
const SvgMarketIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    role="img"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#market-icon_svg__a)"
    >
      <path
        stroke="#F3F5F6"
        d="M4.25 9.917v1.416a4.25 4.25 0 1 0 8.5 0m-8.5-1.416h25.5m-25.5 0L7.083 4.25h19.834l2.833 5.667m-17 1.416V9.917m0 1.416a4.25 4.25 0 0 0 8.5 0m0 0V9.917m0 1.416a4.25 4.25 0 0 0 8.5 0V9.917M7.083 29.75V15.37M26.917 29.75V15.37M12.75 29.75v-5.667a2.833 2.833 0 0 1 2.833-2.833h2.834a2.833 2.833 0 0 1 2.833 2.833v5.667"
      />
      <path stroke="#F36C27" d="M4.25 29.75h25.5" />
    </g>
    <defs>
      <clipPath id="market-icon_svg__a">
        <path fill="#fff" d="M0 0h34v34H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMarketIcon;
