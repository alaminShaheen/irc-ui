import DynamicFormGenerator from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator";
import { useEffect, useState } from "react";

const Builder = () => {
  const [schema, setSchema] = useState<any>();

  const handle = async () => {
    const value = (await import(`../../data/newForms/${"golf-schema.json"}`))
      .default;
    setSchema(value);
  };

  useEffect(() => {
    void handle();
  }, []);
  return schema ? (
    <div className="p-10">
      <DynamicFormGenerator schema={schema} />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Builder;
