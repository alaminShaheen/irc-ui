import { EventDetail } from "../Stepper/AddEventForm/AddEventForm.d";

export interface ICoverageInfo {
  [key: string]: {
    listOfEvents: EventDetail[];
  };
}

export interface IEventPolicy {}
