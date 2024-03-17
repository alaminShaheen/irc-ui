import { useCallback } from "react";
import { compareDesc } from "date-fns";
import { Controller, useForm } from "react-hook-form";

import {
  AddEventModel,
  BinaryResponse,
  EventRepeatFrequency,
  InsuranceCoverageAmount,
} from "@/models/form/AddEventModel";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import useIsTab from "@/hooks/useIsTab";
import Checkbox from "@/components/ui/Checkbox";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import eventClock from "@/assets/icons/event-clock.svg";
import useIsMobile from "@/hooks/useIsMobile";
import RadioButton from "@/components/ui/RadioButton";
import addEventIcon from "@/assets/icons/add-event.svg";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import eventCalendar from "@/assets/icons/event-calendar.svg";
import graphiteAlertInfo from "@/assets/icons/graphite-alert-info.svg";
import { IAddEventModalProps } from "@/components/AddEventModal/AddEventModal.d";
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
  } = translationContent;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    clearErrors,
  } = useForm<AddEventModel>({
    defaultValues: {
      eventName: "",
      rentalFacilityAgreementNumber: "",
      facility: "",
      insuranceCoverageAmount: InsuranceCoverageAmount.ONE_MILLION,
    },
    mode: "onBlur",
  });
  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const onSubmit = useCallback(
    (data: AddEventModel) => {
      onConfirm();
    },
    [onConfirm],
  );

  const onClose = useCallback(() => {
    clearErrors();
    reset();
    toggle();
  }, [reset, clearErrors, toggle]);

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={onClose}
      subtitle={eventName}
    >
      <div className="flex justify-center overflow-y-auto h-[calc(100vh-12rem)] lg:h-[750px]">
        <form className="w-full lg:w-[552px]" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-primary font-bold text-2xl">{basicInfo}</h2>
          <div className="flex flex-col gap-y-1 mt-6">
            <label htmlFor="eventName" className="form-label">
              {nameYourEventLabel}
            </label>
            <input
              {...register("eventName", { required: "Name is required" })}
              id="eventName"
              className={cn("input p-4", {
                "has-error": !!errors.eventName?.message,
              })}
              placeholder={nameYourEventPlaceholder}
              type="text"
            />
            {errors.eventName?.message && (
              <span className="text-sm text-red-500 my-2">
                {errors.eventName.message}
              </span>
            )}
          </div>

          <div className="mt-2 flex">
            <div>
              <Icon
                src={graphiteAlertInfo}
                size={24}
                className="text-primary"
              />
            </div>
            <span className="ml-2 text-graphite-700">{infoText}</span>
          </div>

          <div className="border-dashed border-2 mt-6 border-primary-200 bg-primary-25 rounded-md p-4">
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="rentalFacilityAgreementNumber"
                className="form-label"
              >
                {rentalFacilityLabel}
              </label>
              <input
                {...register("rentalFacilityAgreementNumber", {
                  required: "Rental/facility agreement number(s) required.",
                })}
                id="rentalFacilityAgreementNumber"
                className={cn("input p-4", {
                  "has-error": !!errors.eventName?.message,
                })}
                placeholder={rentalFacilityPlaceholder}
                type="text"
              />
              {errors.rentalFacilityAgreementNumber?.message && (
                <span className="text-sm text-red-500 my-2">
                  {errors.rentalFacilityAgreementNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1 mt-4">
              <label htmlFor="facility" className="form-label">
                {facilityLabel}
              </label>
              <input
                {...register("facility", {
                  required: "Facility is required.",
                })}
                id="facility"
                className={cn("input p-4", {
                  "has-error": !!errors.eventName?.message,
                })}
                placeholder={facilityPlaceholder}
                type="text"
              />
              {errors.facility?.message && (
                <span className="text-sm text-red-500 my-2">
                  {errors.facility.message}
                </span>
              )}
            </div>

            <div className="my-4 h-1 w-full border-t border-graphite-200" />

            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-4">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="startDate" className="form-label">
                  {startDate}
                </label>
                <Controller
                  render={({ field: { onChange, ref, name, value } }) => (
                    <Datepicker
                      icon={<Icon src={eventCalendar} size={28} />}
                      name={name}
                      placeholderText={chooseDate}
                      dateValue={value}
                      hasError={!!errors.startDate?.message}
                      dateOnChange={onChange}
                      ref={ref}
                    />
                  )}
                  rules={{
                    required: "Start date is required",
                  }}
                  name="startDate"
                  control={control}
                />
                {errors.startDate?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.startDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="startTime" className="form-label">
                  {startTime}
                </label>
                <Controller
                  render={({ field: { onChange, ref, name, value } }) => (
                    <TimePicker
                      icon={<Icon src={eventClock} size={28} />}
                      name={name}
                      placeholderText={chooseTime}
                      dateValue={value}
                      hasError={!!errors.endDate?.message}
                      dateOnChange={onChange}
                      ref={ref}
                    />
                  )}
                  rules={{ required: "Start time is required" }}
                  name="startTime"
                  control={control}
                />
                {errors.startTime?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="endDate" className="form-label">
                  {endDate}
                </label>
                <Controller
                  render={({ field: { onChange, ref, name, value } }) => (
                    <Datepicker
                      icon={<Icon src={eventCalendar} size={28} />}
                      name={name}
                      placeholderText={chooseDate}
                      dateValue={value}
                      hasError={!!errors.endDate?.message}
                      dateOnChange={onChange}
                      ref={ref}
                    />
                  )}
                  rules={{
                    required: "End date is required",
                    validate: (value, formValues) => {
                      if (
                        !!formValues.startDate &&
                        compareDesc(formValues.startDate, value) < 0
                      ) {
                        return "End date must be a date after Start date";
                      }
                    },
                    deps: ["startDate"],
                  }}
                  name="endDate"
                  control={control}
                />
                {errors.endDate?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.endDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="endTime" className="form-label">
                  {endTime}
                </label>
                <Controller
                  render={({ field: { onChange, ref, name, value } }) => (
                    <TimePicker
                      icon={<Icon src={eventClock} size={28} />}
                      name={name}
                      placeholderText={chooseTime}
                      dateValue={value}
                      hasError={!!errors.endDate?.message}
                      dateOnChange={onChange}
                      ref={ref}
                    />
                  )}
                  rules={{
                    required: "End time is required",
                    validate: (value, formValues) => {
                      if (
                        !!formValues.startTime &&
                        compareDesc(formValues.startTime, value) < 0
                      ) {
                        return "End time must be a time after Start time";
                      }
                    },
                    deps: ["startTime"],
                  }}
                  name="endTime"
                  control={control}
                />
                {errors.endTime?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center mt-4 gap-x-3">
              <Checkbox {...register("repeatEvent")} id="endTime" />
              <label htmlFor="repeatEvent" className="form-label">
                {repeatEvent}
              </label>
            </div>

            <div className="mt-4 flex flex-col gap-y-2">
              <p className="form-label flex gap-x-3">{repeatLabel}</p>
              <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 lg-gap-y-0 items-start lg:items-baseline">
                <RadioButton
                  selected={
                    watch("repeatFrequency") === EventRepeatFrequency.DAILY
                  }
                  label={daily}
                  {...register("repeatFrequency")}
                  value={EventRepeatFrequency.DAILY}
                />

                <RadioButton
                  selected={
                    watch("repeatFrequency") === EventRepeatFrequency.WEEKLY
                  }
                  label={weekly}
                  {...register("repeatFrequency")}
                  value={EventRepeatFrequency.WEEKLY}
                />

                <RadioButton
                  selected={
                    watch("repeatFrequency") === EventRepeatFrequency.MONTHLY
                  }
                  label={monthly}
                  {...register("repeatFrequency")}
                  value={EventRepeatFrequency.MONTHLY}
                />
              </div>
            </div>

            <Button
              className="border-gray-400 border-2 gap-x-2 rounded mt-8 py-4 px-6 text-xl flex justify-center bg-primary-25 cursor-pointer w-full lg:w-auto"
              variant={ButtonVariant.SECONDARY}
              buttonType={ButtonType.BUTTON}
              icon={
                <Icon src={addEventIcon} alt={addEventIconAltText} size={24} />
              }
            >
              {addTime}
            </Button>
          </div>

          <p className="text-primary font-bold text-2xl my-8">
            {additionalQuestions}
          </p>

          <div className="flex flex-col gap-y-2">
            <p className="form-label flex gap-x-3">{insuranceCoverageLabel}</p>
            <div className="flex flex-col gap-y-4 items-start">
              <RadioButton
                selected={
                  watch("insuranceCoverageAmount") ===
                  InsuranceCoverageAmount.ONE_MILLION
                }
                label="$1 000 000"
                {...register("insuranceCoverageAmount")}
                value={InsuranceCoverageAmount.ONE_MILLION}
              />
              <RadioButton
                selected={
                  watch("insuranceCoverageAmount") ===
                  InsuranceCoverageAmount.TWO_MILLION
                }
                label="$2 000 000"
                {...register("insuranceCoverageAmount")}
                value={InsuranceCoverageAmount.TWO_MILLION}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">
            {foodAndBeverages}
          </p>

          <div className="flex flex-col gap-y-2">
            <p className="form-label flex gap-x-3">{foodBeingSoldLabel}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={watch("foodBeverageSale") === BinaryResponse.YES}
                label={yes}
                {...register("foodBeverageSale")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={watch("foodBeverageSale") === BinaryResponse.NO}
                label={no}
                {...register("foodBeverageSale")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{foodByThirdPartyLabel}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={
                  watch("thirdPartyFoodPackaging") === BinaryResponse.YES
                }
                label={yes}
                {...register("thirdPartyFoodPackaging")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={
                  watch("thirdPartyFoodPackaging") === BinaryResponse.NO
                }
                label={no}
                {...register("thirdPartyFoodPackaging")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{alcoholCoverageLabel}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={
                  watch("requireAlcoholCoverage") === BinaryResponse.YES
                }
                label={yes}
                {...register("requireAlcoholCoverage")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={watch("requireAlcoholCoverage") === BinaryResponse.NO}
                label={no}
                {...register("requireAlcoholCoverage")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">{transport}</p>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{driverLicenceLabel}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={
                  watch("validDriverLicensesPresent") === BinaryResponse.YES
                }
                label={yes}
                {...register("validDriverLicensesPresent")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={
                  watch("validDriverLicensesPresent") === BinaryResponse.NO
                }
                label={no}
                {...register("validDriverLicensesPresent")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{selfTransportation}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={watch("selfTransportation") === BinaryResponse.YES}
                label={yes}
                {...register("selfTransportation")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={watch("selfTransportation") === BinaryResponse.NO}
                label={no}
                {...register("selfTransportation")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{rentalVehicleOwnage}</p>
            <div className="flex gap-x-4">
              <RadioButton
                selected={watch("rentalVehicleOwnage") === BinaryResponse.YES}
                label={yes}
                {...register("rentalVehicleOwnage")}
                value={BinaryResponse.YES}
              />
              <RadioButton
                selected={watch("rentalVehicleOwnage") === BinaryResponse.NO}
                label={no}
                {...register("rentalVehicleOwnage")}
                value={BinaryResponse.NO}
              />
            </div>
          </div>

          <Button
            variant={ButtonVariant.PRIMARY}
            className="mt-8 rounded-md px-16"
            type={ButtonType.SUBMIT}
          >
            {confirm}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEventModal;
