import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";
import { Resolver } from "react-hook-form";
import { ValidActivities } from "@/models/form/ValidActivities";
import { Event } from "@/models/Event";

export interface IDynamicFormGeneratorProps {
  defaultValues?: Event;
  schema: DynamicJsonSchema;
  resolver?: Resolver;
  className?: string;
  onFormSubmit?: (data: Event) => void;
  validActivities: ValidActivities;
}
