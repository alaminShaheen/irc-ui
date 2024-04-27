import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { IBypassBlockProps } from "./BypassBlock.d";
import "./bypassBlock.css";

const DEFAULT_BYPASS_BLOCK_STYLE = "skip-link sr-only";
const BypassBlock = forwardRef<HTMLAnchorElement, IBypassBlockProps>(
  (props, ref) => {
    const { bypassStyle = "", bypassText = "", bypassLink } = props;
    const { t } = useTranslation();
    const bypassTextContent = bypassText || t("common.skipToMain");
    return (
      <a
        ref={ref}
        className={`${DEFAULT_BYPASS_BLOCK_STYLE} ${bypassStyle}`}
        href={`#${bypassLink}`}
        data-testid="irc-bypassblock"
      >
        {bypassTextContent}
      </a>
    );
  },
);

BypassBlock.displayName = "BypassBlock";

export default BypassBlock;
