import { Policy } from "@/models/Policy";
import { InputValue } from "@/models/form/DynamicJsonFormTypes";
import { Event } from "@/models/Event";

export interface IPolicyCard {
  events: Record<string, InputValue>[];
  policy: Policy;
  onAddEvent: (policy: Policy) => void;
  onEditEvent: (event: Event, policy: Policy) => void;
  onDeleteEvent: (eventIndex: number, policy: Policy) => void;
  translationContent: {
    [key: string]: string;
  };
}
