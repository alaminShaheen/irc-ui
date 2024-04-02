import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { ObjectSchema } from "yup";

import {
  AddEventModel,
  BinaryResponse,
  EventRepeatFrequency,
  InsuranceCoverageAmount,
} from "@/models/form/AddEventModel";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import useIsTab from "@/hooks/useIsTab";
import useIsMobile from "@/hooks/useIsMobile";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAddEventModalProps } from "@/components/AddEvent/components/AddEventModal/AddEventModal.d";
import BasicInformationSection from "@/components/AddEvent/components/BasicInformationSection/BasicInformationSection";
import AdditionalQuestionsSection from "@/components/AddEvent/components/AdditionalQuestionsSection/AdditionalQuestionsSection";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

const AddEventModal = (props: IAddEventModalProps) => {
  const { isOpen, toggle, onConfirm, translationContent, eventName } = props;
  const {
    title,
    basicInfo,
    nameYourEventLabel,
    nameYourEventPlaceholder,
    infoText,
    rentalFacilityLabel,
    rentalFacilityPlaceholder,
    facilityLabel,
    facilityPlaceholder,
    startDate,
    startTime,
    endDate,
    endTime,
    chooseDate,
    chooseTime,
    repeatEvent,
    repeatLabel,
    addTime,
    additionalQuestions,
    insuranceCoverageLabel,
    foodAndBeverages,
    foodBeingSoldLabel,
    foodByThirdPartyLabel,
    alcoholCoverageLabel,
    transport,
    driverLicenceLabel,
    selfTransportation,
    rentalVehicleOwnage,
    yes,
    no,
    confirm,
    daily,
    weekly,
    monthly,
    addEventIconAltText,
    // endDateInvalid,
    // endTimeInvalid,
    // startDateInvalid,
    errorKeys,
    // startTimeInvalid,
  } = translationContent;

  const formValidationSchema: ObjectSchema<AddEventModel> = yup.object().shape(
    {
      eventName: yup
        .string()
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      rentalFacilityAgreementNumber: yup
        .string()
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      facility: yup
        .string()
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      startDate: yup
        .date()
        .default(null)
        .required((errorKeys as { [key: string]: string }).fieldRequired)
        .when("endDate", ([endDate], schema) => {
          if (endDate) {
            return schema.max(
              endDate,
              (errorKeys as { [key: string]: string }).startDateInvalid,
            );
          }
          return schema;
        }),
      startTime: yup
        .date()
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      endDate: yup
        .date()
        .default(null)
        .required((errorKeys as { [key: string]: string }).fieldRequired)
        .when("startDate", ([startDate], schema) => {
          if (startDate) {
            return schema.min(
              startDate,
              (errorKeys as { [key: string]: string }).endDateInvalid,
            );
          }
          return schema;
        }),
      endTime: yup
        .date()
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      repeatEvent: yup.boolean().defined(),
      repeatFrequency: yup
        .mixed<EventRepeatFrequency>()
        .oneOf(Object.values(EventRepeatFrequency))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      insuranceCoverageAmount: yup
        .mixed<InsuranceCoverageAmount>()
        .oneOf(Object.values(InsuranceCoverageAmount))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      foodBeverageSale: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      thirdPartyFoodPackaging: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      requireAlcoholCoverage: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      validDriverLicensesPresent: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      selfTransportation: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
      rentalVehicleOwnage: yup
        .mixed<BinaryResponse>()
        .oneOf(Object.values(BinaryResponse))
        .required((errorKeys as { [key: string]: string }).fieldRequired),
    },
    [["endDate", "startDate"]],
  );

  const methods = useForm({
    defaultValues: {
      eventName: "",
      rentalFacilityAgreementNumber: "",
      facility: "",
      insuranceCoverageAmount: InsuranceCoverageAmount.ONE_MILLION,
      repeatFrequency: EventRepeatFrequency.MONTHLY,
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema),
  });
  const { handleSubmit, reset, clearErrors } = methods;
  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const onSubmit = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const onClose = useCallback(() => {
    clearErrors();
    reset();
    toggle();
  }, [reset, clearErrors, toggle]);

  return (
    <Modal
      title={title as string}
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={onClose}
      subtitle={eventName}
    >
      <div className="flex h-[calc(100vh-15rem)] justify-center overflow-y-auto lg:h-[calc(100vh-14rem)]">
        <FormProvider {...methods}>
          <form
            className="w-full lg:w-[552px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <BasicInformationSection
              translationContents={
                {
                  basicInfo,
                  nameYourEventLabel,
                  nameYourEventPlaceholder,
                  infoText,
                  rentalFacilityLabel,
                  rentalFacilityPlaceholder,
                  facilityLabel,
                  facilityPlaceholder,
                  startDate,
                  startTime,
                  endDate,
                  endTime,
                  chooseDate,
                  chooseTime,
                  repeatEvent,
                  repeatLabel,
                  addTime,
                  daily,
                  weekly,
                  monthly,
                  addEventIconAltText,
                } as { [key: string]: string }
              }
            />
            <AdditionalQuestionsSection
              translationContents={
                {
                  additionalQuestions,
                  insuranceCoverageLabel,
                  foodAndBeverages,
                  foodBeingSoldLabel,
                  foodByThirdPartyLabel,
                  alcoholCoverageLabel,
                  transport,
                  driverLicenceLabel,
                  selfTransportation,
                  rentalVehicleOwnage,
                  yes,
                  no,
                } as { [key: string]: string }
              }
            />
            <Button
              variant={ButtonVariant.PRIMARY}
              className="mt-8 rounded-md px-16"
              type={ButtonType.SUBMIT}
            >
              {confirm as string}
            </Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddEventModal;
