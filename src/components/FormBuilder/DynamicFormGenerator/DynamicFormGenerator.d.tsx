import { FormSection } from "@/models/form/DynamicJsonFormTypes";
import { Resolver } from "react-hook-form";

export interface IDynamicFormGeneratorProps {
  schema: FormSection[];
  resolver?: Resolver;
}
