import type { SVGProps } from "react";
const SvgHamburger = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={32} height={25} fill="none" role="img" {...props}><rect width={32} height={5} fill="#fff" rx={2.5} /><rect width={32} height={5} y={10} fill="#fff" rx={2.5} /><rect width={32} height={5} y={20} fill="#fff" rx={2.5} /></svg>;
export default SvgHamburger;