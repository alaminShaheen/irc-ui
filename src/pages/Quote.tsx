import { useCallback, useState } from "react";

import Alert from "@/components/ui/Alert.tsx";
import PolicyCard from "@/components/PolicyCard.tsx";
import InsuredForm from "@/components/InsuredForm.tsx";
import EventConfirmationCard from "@/components/EventConfirmationCard.tsx";

const Quote = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Alert
          alertMessage={"The below information forms part of your policy. Any incorrect information could null and void your policy. Is all information above correct? If not please go edit the application to reflect the correct information. "} />

        <div className="mt-6">

          <div className="text-primary">
            <span className="text-2xl font-bold mr-2">Insured</span>
            <span className="text-sm underline cursor-pointer" onClick={toggleEditMode}>
              {editMode ? "Cancel" : "Edit"}
            </span>
          </div>

          <InsuredForm editModeEnabled={editMode} onCancel={toggleEditMode} onSave={toggleEditMode} />

          {/*Your policies*/}
          <div className="text-primary text-2xl font-bold my-6">
            Your Policies
          </div>

          <ul className="space-y-6">
            {new Array(3).fill(3).map((_, index) => (
              <PolicyCard key={index}
                          title={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aspernatur."}
                          subtitle={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aspernatur consequuntur debitis distinctio ducimus eos esse excepturi impedit, minima odit officiis provident, quae rem reprehenderit repudiandae rerum ullam voluptatem?"}
              />
            ))}
          </ul>

        </div>
      </div>
      <div className="col-span-2">
        <EventConfirmationCard />
      </div>
    </div>
  );
};

export default Quote;
