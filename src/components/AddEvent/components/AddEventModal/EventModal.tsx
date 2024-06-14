import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import useIsTab from "@/hooks/useIsTab";
import { Event } from "@/models/Event";
import useIsMobile from "@/hooks/useIsMobile";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import { ValidActivities } from "@/models/form/ValidActivities";
import DynamicFormGenerator from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator";
import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";
import { IAddEventModalProps } from "@/components/AddEvent/components/AddEventModal/AddEventModal.d";

const EventModal = (props: IAddEventModalProps) => {
  const { isOpen, toggle, onConfirm, translationContent, policy, event } =
    props;
  const { title } = translationContent;
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const [schema, setSchema] = useState<DynamicJsonSchema>();
  const [validActivities, setValidActivities] = useState<ValidActivities>();

  const getSchema = useCallback(async () => {
    const value = await import(
      `../../../../data/newForms/${policy.$schemaRef}.json`
    );
    setSchema(value.default);
  }, [policy.$schemaRef]);

  const getValidActivities = useCallback(async () => {
    const value = await import(`../../../../data/valid-activities.json`);
    setValidActivities(value.default);
  }, []);

  const onSubmit = useCallback(
    (data: Event) => {
      onConfirm(data);
      toggle();
    },
    [onConfirm, toggle],
  );

  useEffect(() => {
    void getSchema();
    void getValidActivities();
  }, [getSchema, getValidActivities]);

  return (
    <Modal
      title={schema?.title ? t(schema?.title) : (title as string)}
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={toggle}
      subtitle={schema?.description ? t(schema?.description) : ""}
    >
      <div className="flex h-[calc(100vh-15rem)] justify-center overflow-y-auto lg:h-[calc(100vh-14rem)]">
        {schema && validActivities && (
          <DynamicFormGenerator
            defaultValues={event}
            validActivities={validActivities}
            onFormSubmit={onSubmit}
            schema={schema}
            className="w-full lg:w-[552px]"
          />
        )}
      </div>
    </Modal>
  );
};

export default EventModal;
