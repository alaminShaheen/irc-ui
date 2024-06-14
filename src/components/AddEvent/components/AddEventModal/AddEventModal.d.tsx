import { CommonModalProps } from "@/components/ui/Modal/Modal.d";
import { Policy } from "@/models/Policy";
import { Event } from "@/models/Event";

export interface IAddEventModalProps extends CommonModalProps {
  event: Event | null;
  onConfirm: (data: Event) => void;
  translationContent: { [key: string]: string | { [key: string]: string } };
  policy: Policy;
}
