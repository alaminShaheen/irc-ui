import { Policy } from "@/models/Policy";
import { EventDetail } from "../Stepper/AddEventForm/AddEventForm.d";
export interface IPolicyCard {
  listOfEvents: EventDetail[];
  policy: Policy;
  onAddEventClick: (event: Policy) => void;
  translationContent: {
    [key: string]: string;
  };
}
