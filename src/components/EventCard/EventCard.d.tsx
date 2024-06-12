import { Event } from "@/models/Event";

export interface IEventCardProps {
  eventIndex: number;
  editEvent: (event: Event) => void;
  deleteEvent: (eventIndex: number) => void;
  event: Event;
  content: {
    [key: string]: string;
  };
}
