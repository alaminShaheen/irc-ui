import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import useIsTab from "@/hooks/useIsTab";
import useIsMobile from "@/hooks/useIsMobile";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import DynamicFormGenerator from "@/components/FormBuilder/DynamicFormGenerator/DynamicFormGenerator";
import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";
import { IAddEventModalProps } from "@/components/AddEvent/components/AddEventModal/AddEventModal.d";

const AddEventModal = (props: IAddEventModalProps) => {
  const { isOpen, toggle, onConfirm, translationContent, policy } = props;
  const { title } = translationContent;

  const [schema, setSchema] = useState<DynamicJsonSchema>();

  const handle = useCallback(async () => {
    const value = await import(
      `../../../../data/newForms/${policy.$schemaRef}.json`
    );
    setSchema(value.default);
  }, [policy.$schemaRef]);

  useEffect(() => {
    void handle();
  }, [handle]);

  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const onSubmit = useCallback(
    (data: any) => {
      onConfirm(data);
    },
    [onConfirm],
  );

  const onClose = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <Modal
      title={title as string}
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={onClose}
      subtitle={policy.subtitle}
    >
      <div className="flex h-[calc(100vh-15rem)] justify-center overflow-y-auto lg:h-[calc(100vh-14rem)]">
        {schema && (
          <DynamicFormGenerator
            onFormSubmit={onSubmit}
            schema={schema}
            className="w-full lg:w-[552px]"
          />
        )}
      </div>
    </Modal>
  );
};

export default AddEventModal;
