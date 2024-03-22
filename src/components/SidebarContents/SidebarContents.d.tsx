import { MouseEvent } from "react";

export interface ISidebarContentProps {
  sidebarOpen: boolean;
  onClose: (event: MouseEvent<HTMLElement>) => void;
  translationContent: { [key: string]: string };
}