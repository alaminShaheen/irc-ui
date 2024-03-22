import type { SVGProps } from "react";
const SvgCalendarTime = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" role="img" {...props}><g stroke="#093C55" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} clipPath="url(#calendar-time_svg__a)"><path d="M10.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M16 3v4M8 3v4M4 11h10" /><path d="M14 18a4 4 0 1 0 8 0 4 4 0 0 0-8 0" /><path d="M18 16.5V18l.5.5" /></g><defs><clipPath id="calendar-time_svg__a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs></svg>;
export default SvgCalendarTime;