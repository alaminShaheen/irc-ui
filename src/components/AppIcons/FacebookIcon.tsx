import type { SVGProps } from "react";
const SvgFacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={34}
    fill="none"
    role="img"
    {...props}
  >
    <path
      fill="#fff"
      d="M33 17.18C33 8.011 25.614.58 16.5.58S0 8.011 0 17.18c0 8.288 6.033 15.155 13.922 16.4v-11.6h-4.19v-4.8h4.19v-3.657c0-4.16 2.462-6.458 6.232-6.458 1.805 0 3.694.324 3.694.324v4.085h-2.082c-2.05 0-2.688 1.28-2.688 2.594v3.112h4.576l-.731 4.8h-3.845v11.6C26.968 32.335 33 25.468 33 17.18"
    />
  </svg>
);
export default SvgFacebookIcon;
