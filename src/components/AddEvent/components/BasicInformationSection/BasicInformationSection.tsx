import {
  getDate,
  getMonth,
  getYear,
  setDate,
  setMonth,
  setYear,
} from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

import {
  AddEventModel,
  EventRepeatFrequency,
} from "@/models/form/AddEventModel";
import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Datepicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import EventClock from "../../../AppIcons/EventClock";
import RadioGroup from "@/components/ui/Radio/components/RadioGroup/RadioGroup";
import AddEventIcon from "../../../AppIcons/AddEvent";
import EventCalendar from "../../../AppIcons/EventCalendar";
import GraphiteAlertInfo from "../../../AppIcons/GraphiteAlertInfo";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { IBasicInformationSectionProps } from "@/components/AddEvent/components/BasicInformationSection/BasicInformationSection.d";

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
      <h2 className="font-segoe text-2xl font-bold text-primary">
        {basicInfo}
      </h2>
      <div className="mt-6 flex flex-col gap-y-1">
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
          <span className="my-2 text-sm text-red-500">
            {errors.eventName.message}
          </span>
        )}
      </div>

      <div className="mt-2 flex">
        <div>
          <Icon
            src={<GraphiteAlertInfo />}
            size={24}
            className="text-primary"
          />
        </div>
        <span className="ml-2 text-graphite-700">{infoText}</span>
      </div>

      <div className="mt-6 rounded-md border-2 border-dashed border-primary-200 bg-primary-25 p-4">
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
            <span className="my-2 text-sm text-red-500">
              {errors.rentalFacilityAgreementNumber.message}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-y-1">
          <label htmlFor="facility" className="form-label">
            {facilityLabel}
          </label>
          <input
            {...register("facility")}
            id="facility"
            className={cn("input p-4", {
              "has-error": !!errors.facility?.message,
            })}
            placeholder={facilityPlaceholder}
            type="text"
          />
          {errors.facility?.message && (
            <span className="my-2 text-sm text-red-500">
              {errors.facility.message}
            </span>
          )}
        </div>

        <div className="my-4 h-1 w-full border-t border-graphite-200" />

        <div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="startDate" className="form-label">
              {startDate}
            </label>
            <Controller
              render={({ field: { onChange, ref, name, value, onBlur } }) => (
                <Datepicker
                  id={name}
                  icon={<Icon src={<EventCalendar />} size={38} />}
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
              <span className="my-2 text-sm text-red-500">
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
                  icon={<Icon src={<EventClock />} size={28} />}
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
              <span className="my-2 text-sm text-red-500">
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
                  icon={<Icon src={<EventCalendar />} size={28} />}
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
              <span className="my-2 text-sm text-red-500">
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
                  icon={<Icon src={<EventClock />} size={28} />}
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
              <span className="my-2 text-sm text-red-500">
                {errors.endTime.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-x-3">
          <Checkbox {...register("repeatEvent")} id="repeatEvent" />
          <label htmlFor="repeatEvent" className="form-label">
            {repeatEvent}
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-y-2">
          <p className="form-label flex gap-x-3">{repeatLabel}</p>
          <RadioGroup
            className="lg-gap-y-0 flex flex-col items-start gap-y-4 lg:flex-row lg:items-baseline lg:gap-x-4"
            name="repeatFrequency"
            radioProps={[
              {
                value: EventRepeatFrequency.DAILY,
                label: daily,
                checked:
                  watch("repeatFrequency") === EventRepeatFrequency.DAILY,
              },
              {
                value: EventRepeatFrequency.WEEKLY,
                label: weekly,
                checked:
                  watch("repeatFrequency") === EventRepeatFrequency.WEEKLY,
              },
              {
                value: EventRepeatFrequency.MONTHLY,
                label: monthly,
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
            <Icon src={<AddEventIcon />} alt={addEventIconAltText} size={24} />
          }
        >
          {addTime}
        </Button>
      </div>
    </>
  );
};

export default BasicInformationSection;
