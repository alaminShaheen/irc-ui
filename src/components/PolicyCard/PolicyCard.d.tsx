import { Policy } from "@/models/Policy";
import { EventDetail } from "../Stepper/AddEventForm/AddEventForm.d";
export interface IPolicyCard {
  listOfEvents: EventDetail[];
  policy: Policy;
  onAddEventClick: (eventName: string) => void;
  translationContent: {
    [key: string]: string;
  };
}
