import { Policy } from "@/models/Policy";

export interface IPolicyCard {
  policy: Policy;
  onAddEventClick: (eventName: string) => void;
  translationContent: {
    [key: string]: string;
  };
}
