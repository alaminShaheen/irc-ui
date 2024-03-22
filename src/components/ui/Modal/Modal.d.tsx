import { ReactNode } from "react";


export interface IModalProps extends CommonModalProps{
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: ModalSize
}

export type CommonModalProps = {
  isOpen: boolean;
  toggle: () => void;
}

export enum ModalSize {
  SMALL= "sm",
  LARGE = "lg"
}