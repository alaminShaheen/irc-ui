import type { SVGProps } from "react";
const SvgRecurringTaskIcon = (props: SVGProps<SVGSVGElement>) => (
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
      clipPath="url(#recurring-task-icon_svg__a)"
    >
      <path d="M18.75 31.5H9a3 3 0 0 1-3-3v-18a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3V15M24 4.5v6M12 4.5v6M6 16.5h18M30 21l3 3h-4.5M30 27l3-3M28.5 24a4.5 4.5 0 1 0 3 7.854" />
    </g>
    <defs>
      <clipPath id="recurring-task-icon_svg__a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgRecurringTaskIcon;
