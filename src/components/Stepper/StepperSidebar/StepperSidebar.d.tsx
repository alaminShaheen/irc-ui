import { StepperStepInformation } from "@/models/StepperStepInformation";

export interface IStepperSidebar {
  steps: StepperStepInformation[];
  activeStepIndex: number;
  className?: string;
}
