import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { compareDesc } from "date-fns";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import useIsTab from "@/hooks/useIsTab";
import Checkbox from "@/components/ui/Checkbox";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import eventClock from "@/assets/icons/event-clock.svg";
import useIsMobile from "@/hooks/useIsMobile";
import addEventIcon from "@/assets/icons/add-event.svg";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import eventCalendar from "@/assets/icons/event-calendar.svg";
import { LanguageCode } from "@/models/enums/LanguageCode";
import RadioButtonGroup from "@/components/ui/RadioButtonGroup";
import { AddEventModel } from "@/models/form/AddEventModel";
import graphiteAlertInfo from "@/assets/icons/graphite-alert-info.svg";
import { IAddEventModalProps } from "@/components/AddEventModal/AddEventModal.d";
import { EventRepeatFrequency } from "@/models/enums/EventRepeatFrequency";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

const AddEventModal = (props: IAddEventModalProps) => {
  const { isOpen, toggle, onConfirm, translationContent, eventName } = props;
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();
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
  } = translationContent;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddEventModel>({
    defaultValues: {
      eventName: "",
      rentalFacilityAgreementNumber: "",
      facility: "",
      repeatEvent: false,
      insuranceCoverageAmount: 1000000,
      thirdPartyFoodPackaging: true,
      requireAlcoholCoverage: true,
      validDriverLicensesPresent: true,
      selfTransportation: true,
      rentalVehicleOwnage: true,
    },
    mode: "all",
  });
  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const onSubmit = useCallback(
    (data: AddEventModel) => {
      onConfirm();
    },
    [onConfirm],
  );

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={toggle}
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
              className={twMerge(
                "input p-4",
                errors.eventName?.message && "has-error",
              )}
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
                className={twMerge(
                  "input p-4",
                  errors.rentalFacilityAgreementNumber?.message && "has-error",
                )}
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
                className={twMerge(
                  "input p-4",
                  errors.facility?.message && "has-error",
                )}
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
                <RadioButtonGroup
                  {...register("repeatFrequency")}
                  radioButtons={[
                    {
                      value:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.DAILY
                          : EventRepeatFrequency.DAILY_FR,
                      id:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.DAILY
                          : EventRepeatFrequency.DAILY_FR,
                      label:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.DAILY
                          : EventRepeatFrequency.DAILY_FR,
                    },
                    {
                      value:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.WEEKLY
                          : EventRepeatFrequency.WEEKLY_FR,
                      id:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.WEEKLY
                          : EventRepeatFrequency.WEEKLY_FR,
                      label:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.WEEKLY
                          : EventRepeatFrequency.WEEKLY_FR,
                    },
                    {
                      value:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.MONTHLY
                          : EventRepeatFrequency.MONTHLY_FR,
                      id:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.MONTHLY
                          : EventRepeatFrequency.MONTHLY_FR,
                      label:
                        currentLanguage === LanguageCode.ENGLISH
                          ? EventRepeatFrequency.MONTHLY
                          : EventRepeatFrequency.MONTHLY_FR,
                    },
                  ]}
                />
              </div>
            </div>

            <Button
              className="border-gray-400 border-2 gap-x-2 rounded mt-8 py-4 px-6 text-xl flex justify-center bg-primary-25 cursor-pointer w-full lg:w-auto"
              variant={ButtonVariant.SECONDARY}
              icon={<Icon src={addEventIcon} alt="add event" size={24} />}
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
              <RadioButtonGroup
                {...register("insuranceCoverageAmount")}
                radioButtons={[
                  { value: 1000000, id: "1000000", label: "$1 000 000" },
                  { value: 2000000, id: "2000000", label: "$2 000 000" },
                ]}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">
            {foodAndBeverages}
          </p>

          <div className="flex flex-col gap-y-2">
            <p className="form-label flex gap-x-3">{foodBeingSoldLabel}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("foodBeverageSale")}
                radioButtons={[
                  { value: true, id: "foodBeverageSale-yes", label: yes },
                  { value: false, id: "foodBeverageSale-no", label: no },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{foodByThirdPartyLabel}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("thirdPartyFoodPackaging")}
                radioButtons={[
                  {
                    value: true,
                    id: "thirdPartyFoodPackaging-yes",
                    label: yes,
                  },
                  {
                    value: false,
                    id: "thirdPartyFoodPackaging-no",
                    label: no,
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{alcoholCoverageLabel}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("requireAlcoholCoverage")}
                radioButtons={[
                  {
                    value: true,
                    id: "requireAlcoholCoverage-yes",
                    label: yes,
                  },
                  {
                    value: false,
                    id: "requireAlcoholCoverage-no",
                    label: no,
                  },
                ]}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">{transport}</p>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{driverLicenceLabel}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("validDriverLicensesPresent")}
                radioButtons={[
                  {
                    value: true,
                    id: "validDriverLicensesPresent-yes",
                    label: yes,
                  },
                  {
                    value: false,
                    id: "validDriverLicensesPresent-no",
                    label: no,
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{selfTransportation}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("selfTransportation")}
                radioButtons={[
                  {
                    value: true,
                    id: "selfTransportation-yes",
                    label: yes,
                  },
                  {
                    value: false,
                    id: "selfTransportation-no",
                    label: no,
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">{rentalVehicleOwnage}</p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("rentalVehicleOwnage")}
                radioButtons={[
                  {
                    value: true,
                    id: "rentalVehicleOwnage-yes",
                    label: yes,
                  },
                  {
                    value: false,
                    id: "rentalVehicleOwnage-no",
                    label: no,
                  },
                ]}
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
