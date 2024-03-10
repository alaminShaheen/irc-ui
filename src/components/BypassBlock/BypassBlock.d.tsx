export interface IBypassBlockProps {
  /**
   * Optional: Bypass block styling
   */
  bypassStyle?: string;
  /**
   * Optional: Bypass link text. Default text is - <b>Skip to Main Content</b>
   */
  bypassText?: string;
  /**
   * Required: Bypass link for skipping part
   */
  bypassLink: string;
}
