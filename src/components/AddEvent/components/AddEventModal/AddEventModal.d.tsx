import { CommonModalProps } from "@/components/ui/Modal/Modal.d";

export interface IAddEventModalProps extends CommonModalProps {
  onConfirm: (data: EventDetail) => void;
  translationContent: { [key: string]: string | { [key: string]: string } };
  eventName: string;
}
