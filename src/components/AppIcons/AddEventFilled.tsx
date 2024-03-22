import type { SVGProps } from "react";
const SvgAddEventFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    role="img"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#add-event-filled_svg__a)"
    >
      <path
        fill="#F36C27"
        stroke="#F36C27"
        d="M3 12a9 9 0 1 0 18.001 0A9 9 0 0 0 3 12"
      />
      <path stroke="#fff" d="M9 12h6M12 9v6" />
    </g>
    <defs>
      <clipPath id="add-event-filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAddEventFilled;
