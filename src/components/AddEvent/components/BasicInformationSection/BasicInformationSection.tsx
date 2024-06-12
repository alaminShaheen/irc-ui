import {
  getDate,
  getMonth,
  getYear,
  setDate,
  setMonth,
  setYear,
} from "date-fns";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  AddEventModel,
  EventRepeatFrequency,
} from "@/models/form/AddEventModel";
import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FormError from "@/components/FormError";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import RadioGroup from "@/components/ui/Radio/components/RadioGroup/RadioGroup";
import EventClock from "@/components/AppIcons/EventClock";
import AddEventIcon from "@/components/AppIcons/AddEvent";
import EventCalendar from "@/components/AppIcons/EventCalendar";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { useEffect } from "react";

const BasicInformationSection = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<AddEventModel>();
  const { t } = useTranslation();

  const pageContent = {
    basicInfo: t("pages.addEventForm.addEventModal.basicInfo"),
    nameYourEventLabel: t(
      "pages.addEventForm.addEventModal.nameYourEventLabel",
    ),
    nameYourEventPlaceholder: t(
      "pages.addEventForm.addEventModal.nameYourEventPlaceholder",
    ),
    infoText: t("pages.addEventForm.addEventModal.infoText"),
    rentalFacilityLabel: t(
      "pages.addEventForm.addEventModal.rentalFacilityLabel",
    ),
    rentalFacilityPlaceholder: t(
      "pages.addEventForm.addEventModal.rentalFacilityPlaceholder",
    ),
    facilityLabel: t("pages.addEventForm.addEventModal.facilityLabel"),
    facilityPlaceholder: t(
      "pages.addEventForm.addEventModal.facilityPlaceholder",
    ),
    repeatLabel: t("pages.addEventForm.addEventModal.repeatLabel"),
    startDate: t("pages.addEventForm.addEventModal.startDate"),
    startTime: t("pages.addEventForm.addEventModal.startTime"),
    endDate: t("pages.addEventForm.addEventModal.endDate"),
    endTime: t("pages.addEventForm.addEventModal.endTime"),
    chooseDate: t("pages.addEventForm.addEventModal.chooseDate"),
    chooseTime: t("pages.addEventForm.addEventModal.chooseTime"),
    repeatEvent: t("pages.addEventForm.addEventModal.repeatEvent"),
    addTime: t("pages.addEventForm.addEventModal.addTime"),
    additionalQuestions: t(
      "pages.addEventForm.addEventModal.additionalQuestions",
    ),
    insuranceCoverageLabel: t(
      "pages.addEventForm.addEventModal.insuranceCoverageLabel",
    ),
    foodAndBeverages: t("pages.addEventForm.addEventModal.foodAndBeverages"),
    foodBeingSoldLabel: t(
      "pages.addEventForm.addEventModal.foodBeingSoldLabel",
    ),
    foodByThirdPartyLabel: t(
      "pages.addEventForm.addEventModal.foodByThirdPartyLabel",
    ),
    alcoholCoverageLabel: t(
      "pages.addEventForm.addEventModal.alcoholCoverageLabel",
    ),
    transport: t("pages.addEventForm.addEventModal.transport"),
    driverLicenceLabel: t(
      "pages.addEventForm.addEventModal.driverLicenceLabel",
    ),
    selfTransportation: t(
      "pages.addEventForm.addEventModal.selfTransportation",
    ),
    rentalVehicleOwnage: t(
      "pages.addEventForm.addEventModal.rentalVehicleOwnage",
    ),
    yes: t("pages.addEventForm.addEventModal.yes"),
    no: t("pages.addEventForm.addEventModal.no"),
    confirm: t("pages.addEventForm.addEventModal.confirm"),
    daily: t("pages.addEventForm.addEventModal.daily"),
    weekly: t("pages.addEventForm.addEventModal.weekly"),
    monthly: t("pages.addEventForm.addEventModal.monthly"),
    addEventIconAltText: t("common.iconAltText.addEvent"),
    errorKeys: {
      fieldRequired: "pages.addEventForm.addEventModal.errors.fieldRequired",
      endDateInvalid: "pages.addEventForm.addEventModal.errors.endDateInvalid",
      endTimeInvalid: "pages.addEventForm.addEventModal.errors.endTimeInvalid",
      startDateInvalid:
        "pages.addEventForm.addEventModal.errors.startDateInvalid",
      startTimeInvalid:
        "pages.addEventForm.addEventModal.errors.startTimeInvalid",
    } as { [key: string]: string },
  };

  useEffect(() => {
    setValue("repeatEvent", false);
  }, [setValue]);

  return (
    <>
      <div className="rounded-md border-2 border-dashed border-primary-200 bg-primary-25 p-4">
        <div
          className={cn("form-group", {
            "has-error": errors.rentalFacilityAgreementNumber,
          })}
        >
          <label htmlFor="rentalFacilityAgreementNumber" className="form-label">
            {pageContent.rentalFacilityLabel}
          </label>
          <input
            {...register("rentalFacilityAgreementNumber")}
            id="rentalFacilityAgreementNumber"
            className="input p-4"
            placeholder={pageContent.rentalFacilityPlaceholder}
            type="text"
            aria-describedby={
              errors.rentalFacilityAgreementNumber?.message
                ? "facilityAgreementNumber-error"
                : undefined
            }
          />
          {errors.rentalFacilityAgreementNumber?.message && (
            <FormError
              id="facilityAgreementNumber-error"
              errorMessage={t(errors.rentalFacilityAgreementNumber.message)}
            />
          )}
        </div>

        <div
          className={cn("form-group mt-4", { "has-error": errors.facility })}
        >
          <label htmlFor="facility" className="form-label">
            {pageContent.facilityLabel}
          </label>
          <input
            {...register("facility")}
            id="facility"
            className="input p-4"
            placeholder={pageContent.facilityPlaceholder}
            type="text"
            aria-describedby={
              errors.facility?.message ? "facility-error" : undefined
            }
          />
          {errors.facility?.message && (
            <FormError
              id="facility-error"
              errorMessage={t(errors.facility.message)}
            />
          )}
        </div>

        <div className="my-4 h-1 w-full border-t border-graphite-200" />

        <div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className={cn("form-group", { "has-error": errors.startDate })}>
            <label htmlFor="startDate" className="form-label">
              {pageContent.startDate}
            </label>
            <Controller
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <Datepicker
                  id={name}
                  icon={<Icon src={<EventCalendar />} size={38} />}
                  name={name}
                  placeholderText={pageContent.chooseDate}
                  dateValue={value}
                  hasError={!!errors.startDate?.message}
                  dateOnChange={(date) => {
                    onChange(date);
                    onBlur();
                  }}
                  ref={ref}
                />
              )}
              name="startDate"
              control={control}
            />
            {errors.startDate?.message && (
              <FormError
                id="stardate-error"
                errorMessage={t(errors.startDate.message)}
              />
            )}
          </div>

          <div className={cn("form-group", { "has-error": errors.startTime })}>
            <label htmlFor="startTime" className="form-label">
              {pageContent.startTime}
            </label>
            <Controller
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <TimePicker
                  id={name}
                  icon={<Icon src={<EventClock />} size={28} />}
                  name={name}
                  placeholderText={pageContent.chooseTime}
                  dateValue={value}
                  hasError={!!errors.startTime?.message}
                  dateOnChange={(startTime) => {
                    if (watch("startDate")) {
                      const oldStartTime = new Date(startTime!.getTime());
                      let newTime = setDate(
                        oldStartTime,
                        getDate(watch("startDate")),
                      );
                      newTime = setMonth(newTime, getMonth(watch("startDate")));
                      newTime = setYear(newTime, getYear(watch("startDate")));
                      startTime = newTime;
                    }
                    onChange(startTime);
                    onBlur();
                  }}
                  ref={ref}
                />
              )}
              name="startTime"
              control={control}
            />
            {errors.startTime?.message && (
              <FormError
                id="startTime-error"
                errorMessage={t(errors.startTime.message)}
              />
            )}
          </div>

          <div className={cn("form-group", { "has-error": errors.endDate })}>
            <label htmlFor="endDate" className="form-label">
              {pageContent.endDate}
            </label>
            <Controller
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <Datepicker
                  id={name}
                  icon={<Icon src={<EventCalendar />} size={28} />}
                  name={name}
                  placeholderText={pageContent.chooseDate}
                  dateValue={value}
                  hasError={!!errors.endDate?.message}
                  dateOnChange={(date) => {
                    onChange(date);
                    onBlur();
                  }}
                  ref={ref}
                />
              )}
              name="endDate"
              control={control}
            />
            {errors.endDate?.message && (
              <FormError
                id="endDate-error"
                errorMessage={t(errors.endDate.message)}
              />
            )}
          </div>

          <div className={cn("form-group", { "has-error": errors.endTime })}>
            <label htmlFor="endTime" className="form-label">
              {pageContent.endTime}
            </label>
            <Controller
              render={({ field: { onChange, ref, name, value } }) => (
                <TimePicker
                  id={name}
                  icon={<Icon src={<EventClock />} size={28} />}
                  name={name}
                  placeholderText={pageContent.chooseTime}
                  dateValue={value}
                  hasError={!!errors.endDate?.message}
                  dateOnChange={onChange}
                  ref={ref}
                />
              )}
              name="endTime"
              control={control}
            />
            {errors.endTime?.message && (
              <FormError
                id="endTime-error"
                errorMessage={t(errors.endTime.message)}
              />
            )}
          </div>
        </div>

        <div
          className={cn(
            "form-checkbox-group mt-6 flex items-center space-x-3",
            {
              "has-error": errors.repeatEvent,
            },
          )}
        >
          <Checkbox {...register("repeatEvent")} id="repeatEvent" />
          <label htmlFor="repeatEvent" className="form-label">
            {pageContent.repeatEvent}
          </label>
        </div>

        <div
          className={cn("form-group mt-4", {
            "has-error": errors.repeatFrequency,
          })}
        >
          <p className="form-label flex gap-x-3">{pageContent.repeatLabel}</p>
          <RadioGroup
            className="lg-gap-y-0 flex flex-col items-start gap-y-4 lg:flex-row lg:items-baseline lg:gap-x-4"
            name="repeatFrequency"
            radioProps={[
              {
                value: EventRepeatFrequency.DAILY,
                label: pageContent.daily,
                checked:
                  watch("repeatFrequency") === EventRepeatFrequency.DAILY,
              },
              {
                value: EventRepeatFrequency.WEEKLY,
                label: pageContent.weekly,
                checked:
                  watch("repeatFrequency") === EventRepeatFrequency.WEEKLY,
              },
              {
                value: EventRepeatFrequency.MONTHLY,
                label: pageContent.monthly,
                checked:
                  watch("repeatFrequency") === EventRepeatFrequency.MONTHLY,
              },
            ]}
          />
        </div>

        <Button
          className="mt-8 flex w-full cursor-pointer justify-center gap-x-2 rounded border-2 border-gray-400 bg-primary-25 px-6 py-4 text-xl lg:w-auto"
          variant={ButtonVariant.SECONDARY}
          buttonType={ButtonType.BUTTON}
          icon={
            <Icon
              src={<AddEventIcon />}
              alt={pageContent.addEventIconAltText}
              size={24}
            />
          }
        >
          {pageContent.addTime}
        </Button>
      </div>
    </>
  );
};

export default BasicInformationSection;
