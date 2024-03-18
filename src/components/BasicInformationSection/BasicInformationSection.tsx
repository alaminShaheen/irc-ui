import { getDate, getMonth, getYear, setDate, setMonth, setYear } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

import { AddEventModel, EventRepeatFrequency } from "@/models/form/AddEventModel";
import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import eventClock from "@/assets/icons/event-clock.svg";
import RadioButton from "@/components/ui/RadioButton";
import addEventIcon from "@/assets/icons/add-event.svg";
import graphiteAlertInfo from "@/assets/icons/graphite-alert-info.svg";
import eventCalendar from "@/assets/icons/event-calendar.svg";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { IBasicInformationSectionProps } from "@/components/BasicInformationSection/BasicInformationSection.d";

const BasicInformationSection = (props: IBasicInformationSectionProps) => {
  const {
    translationContents: {
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
    },
  } = props;
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<AddEventModel>();

  return (
    <>
      <h2 className="text-primary font-bold text-2xl">{basicInfo}</h2>
      <div className="flex flex-col gap-y-1 mt-6">
        <label htmlFor="eventName" className="form-label">
          {nameYourEventLabel}
        </label>
        <input
          {...register("eventName")}
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
          <Icon src={graphiteAlertInfo} size={24} className="text-primary" />
        </div>
        <span className="ml-2 text-graphite-700">{infoText}</span>
      </div>

      <div className="border-dashed border-2 mt-6 border-primary-200 bg-primary-25 rounded-md p-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="rentalFacilityAgreementNumber" className="form-label">
            {rentalFacilityLabel}
          </label>
          <input
            {...register("rentalFacilityAgreementNumber")}
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
            {...register("facility")}
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
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <Datepicker
                  id={name}
                  icon={<Icon src={eventCalendar} size={38} />}
                  name={name}
                  placeholderText={chooseDate}
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
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <TimePicker
                  id={name}
                  icon={<Icon src={eventClock} size={28} />}
                  name={name}
                  placeholderText={chooseTime}
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
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <Datepicker
                  id={name}
                  icon={<Icon src={eventCalendar} size={28} />}
                  name={name}
                  placeholderText={chooseDate}
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
                  id={name}
                  icon={<Icon src={eventClock} size={28} />}
                  name={name}
                  placeholderText={chooseTime}
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
              <span className="text-sm text-red-500 my-2">
                {errors.endTime.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <Checkbox {...register("repeatEvent")} id="repeatEvent" />
          <label htmlFor="repeatEvent" className="form-label">
            {repeatEvent}
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-y-2">
          <p className="form-label flex gap-x-3">{repeatLabel}</p>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 lg-gap-y-0 items-start lg:items-baseline">
            <RadioButton
              selected={watch("repeatFrequency") === EventRepeatFrequency.DAILY}
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
          icon={<Icon src={addEventIcon} alt={addEventIconAltText} size={24} />}
        >
          {addTime}
        </Button>
      </div>
    </>
  );
};

export default BasicInformationSection;
