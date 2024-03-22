import type { SVGProps } from "react";
const SvgModalClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    fill="none"
    role="img"
    {...props}
  >
    <circle cx={22.5} cy={22.5} r={22.5} fill="#F5F5F6" />
    <g
      stroke="#3A6377"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#modal-close_svg__a)"
    >
      <path d="M29 16 17 28M17 16l12 12" />
    </g>
    <defs>
      <clipPath id="modal-close_svg__a">
        <path fill="#fff" d="M11 10h24v24H11z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgModalClose;
