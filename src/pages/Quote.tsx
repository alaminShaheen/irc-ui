import { useCallback, useState, useEffect } from "react";

import Alert from "@/components/ui/Alert/Alert";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import InsuredForm from "@/components/InsuredForm/InsuredForm";
import EventConfirmationCard from "@/components/EventConfirmationCard/EventConfirmationCard";
import Button from "@/components/ui/Button";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const Quote = () => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.title = "IRC Quote page";
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Alert
          alertMessage={
            "The below information forms part of your policy. Any incorrect information could null and void your policy. Is all information above correct? If not please go edit the application to reflect the correct information. "
          }
        />

        <div className="mt-6">
          <div className="flex text-primary items-center">
            <h1 className="text-2xl font-bold mr-2">Insured</h1>

            <Button
              className="underline cursor-pointer px-0"
              variant={ButtonVariant.TRANSPARENT}
              onClick={toggleEditMode}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </div>

          <InsuredForm
            editModeEnabled={editMode}
            onCancel={toggleEditMode}
            onSave={toggleEditMode}
          />

          {/*Your policies*/}
          <h1 className="text-primary text-2xl font-bold my-8">
            Your Policies
          </h1>

          <ul className="space-y-6">
            {new Array(3).fill(3).map((_, index) => (
              <PolicyCard
                key={index}
                title={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aspernatur."
                }
                subtitle={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aspernatur consequuntur debitis distinctio ducimus eos esse excepturi impedit, minima odit officiis provident, quae rem reprehenderit repudiandae rerum ullam voluptatem?"
                }
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
