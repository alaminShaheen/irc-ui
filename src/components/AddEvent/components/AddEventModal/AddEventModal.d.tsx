import { CommonModalProps } from "@/components/ui/Modal/Modal.d";
import { Policy } from "@/models/Policy";
import { EventDetail } from "@/components/Stepper/AddEventForm/AddEventForm.d";

export interface IAddEventModalProps extends CommonModalProps {
  onConfirm: (data: EventDetail) => void;
  translationContent: { [key: string]: string | { [key: string]: string } };
  policy: Policy;
}
