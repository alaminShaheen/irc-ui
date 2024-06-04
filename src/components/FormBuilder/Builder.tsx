import DynamicFormGenerator from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator";
import { golfSchema } from "@/data/newForms/golf-schema";

const Builder = () => {
  return (
    <div className="p-10">
      <DynamicFormGenerator schema={golfSchema} />
    </div>
  );
};

export default Builder;
