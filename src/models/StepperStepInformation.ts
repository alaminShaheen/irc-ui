import { ComponentType } from "react";

export type StepperStepInformation = {
  id: number;
  title: string;
  subtitle: string;
  route: string;
  Component: ComponentType;
};
