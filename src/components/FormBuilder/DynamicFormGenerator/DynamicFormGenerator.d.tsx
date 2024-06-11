import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";
import { Resolver } from "react-hook-form";

export interface IDynamicFormGeneratorProps {
  schema: DynamicJsonSchema;
  resolver?: Resolver;
  className?: string;
  onFormSubmit?: (data: any) => void;
}
