import type { SVGProps } from "react";
const SvgCheckout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    role="img"
    {...props}
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      clipPath="url(#checkout_svg__a)"
    >
      <path d="M16.5 25.333h-8a4 4 0 0 1-4-4V10.667a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v6M4.5 13.334h24M21.834 25.334h8M25.834 21.334l4 4-4 4M9.84 20h.007M15.167 20h2.666" />
    </g>
    <defs>
      <clipPath id="checkout_svg__a">
        <path fill="#fff" d="M.5 0h32v32H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheckout;
