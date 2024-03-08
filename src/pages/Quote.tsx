import { useCallback, useState } from "react";

import Alert from "@/components/ui/Alert.tsx";
import InsuredForm from "@/components/InsuredForm.tsx";

const Quote = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-x-6">
      <div>
        <Alert
          alertMessage={"The below information forms part of your policy. Any incorrect information could null and void your policy. Is all information above correct? If not please go edit the application to reflect the correct information. "} />

        <div className="mt-6">

          <div className="text-primary">
            <span className="text-xl font-bold mr-2">Insured</span>
            <span className="text-xs underline cursor-pointer" onClick={toggleEditMode}>
              {editMode ? "Cancel" : "Edit"}
            </span>
          </div>

          <InsuredForm editModeEnabled={editMode} onCancel={toggleEditMode} onSave={toggleEditMode} />
        </div>
      </div>
      <div>World</div>
    </div>
  );
};

export default Quote;
