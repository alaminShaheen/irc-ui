import { ForwardRefRenderFunction, forwardRef } from "react";
import { IBypassBlockProps } from "./BypassBlock.d";
import "./bypassBlock.css";

const DEFAULT_BYPASS_BLOCK_STYLE = "skip-link sr-only";
const BypassBlock: ForwardRefRenderFunction<
  HTMLAnchorElement,
  IBypassBlockProps
> = (
  { bypassStyle = "", bypassText = "Skip to Main Content", bypassLink },
  ref,
) => {
  return (
    <a
      ref={ref}
      className={`${DEFAULT_BYPASS_BLOCK_STYLE} ${bypassStyle}`}
      href={`#${bypassLink}`}
    >
      {bypassText}
    </a>
  );
};

export default forwardRef(BypassBlock);
