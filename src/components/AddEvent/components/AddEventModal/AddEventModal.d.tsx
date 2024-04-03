import { CommonModalProps } from "@/components/ui/Modal/Modal.d";

export interface IAddEventModalProps extends CommonModalProps {
  onConfirm: () => void;
  translationContent: { [key: string]: string | { [key: string]: string } };
  eventName: string;
}
