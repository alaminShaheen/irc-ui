import { ForwardRefRenderFunction, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { IBypassBlockProps } from "./BypassBlock.d";
import "./bypassBlock.css";

const DEFAULT_BYPASS_BLOCK_STYLE = "skip-link sr-only";
const BypassBlock: ForwardRefRenderFunction<
  HTMLAnchorElement,
  IBypassBlockProps
> = ({ bypassStyle = "", bypassText = "", bypassLink }, ref) => {
  const { t } = useTranslation();
  const bypassTextContent = bypassText || t("common.skipToMain");
  return (
    <a
      ref={ref}
      className={`${DEFAULT_BYPASS_BLOCK_STYLE} ${bypassStyle}`}
      href={`#${bypassLink}`}
    >
      {bypassTextContent}
    </a>
  );
};

export default forwardRef(BypassBlock);
