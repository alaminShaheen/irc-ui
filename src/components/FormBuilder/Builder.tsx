import DynamicFormGenerator from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator";
import { surveyForm } from "@/components/ui/schema";

const Builder = () => {
  return (
    <div className="p-10">
      <DynamicFormGenerator schema={surveyForm} />
    </div>
  );
};

export default Builder;
