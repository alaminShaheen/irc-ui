import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import FormError from "@/components/FormError";
import AddEventIcon from "@/components/AppIcons/AddEvent";
import { AddEventModel } from "@/models/form/AddEventModel";
import MobiScrollDatePicker from "@/components/ui/MobiScrollDatePicker";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { IEventDatesProps } from "@/components/AddEvent/components/EventDates/EventDates.d";

const EventDates = (props: IEventDatesProps) => {
  const { facilityIndex } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext<AddEventModel>();
  const { fields, append, remove, update } = useFieldArray<
    AddEventModel,
    `facilityInfo.${number}.dateRanges`,
    "id"
  >({
    control,
    name: `facilityInfo.${facilityIndex}.dateRanges` as "facilityInfo.0.dateRanges",
  });
  const [editModeFields, setEditModeFields] = useState<boolean[]>(
    new Array(fields.length).fill(true),
  );
  const { t } = useTranslation();

  const pageContent = {
    eventDuration: t("pages.addEventForm.addEventModal.eventDuration"),
    eventDurations: t("pages.addEventForm.addEventModal.eventDurations"),
    chooseDuration: t("pages.addEventForm.addEventModal.chooseDuration"),
    addDuration: t("pages.addEventForm.addEventModal.addDuration"),
    saveDuration: t("pages.addEventForm.addEventModal.saveDuration"),
    editDuration: t("pages.addEventForm.addEventModal.editDuration"),
    addFacility: t("pages.addEventForm.addEventModal.addFacility"),
    deleteDuration: t("pages.addEventForm.addEventModal.deleteDuration"),
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

  const onEventDateChange = useCallback(
    (index: number, dates: Date[]) => {
      update(index, { startDate: dates[0], endDate: dates[1] });
    },
    [update],
  );

  const addEventDuration = useCallback(() => {
    append({ startDate: new Date(), endDate: new Date() });
    setEditModeFields((prev) => [...prev, true]);
  }, [append]);

  const deleteEventDuration = useCallback(
    (index: number) => {
      remove(index);
      setEditModeFields((prev) => prev.filter((_, idx) => idx !== index));
    },
    [remove],
  );

  const formatDate = useCallback((date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace(",", " ");
  }, []);

  return (
    <>
      <h3 className="mt-2">{pageContent.eventDurations}</h3>

      {fields.map((field, index) => {
        return (
          <div
            className={cn("form-group mt-2", {
              "has-error": errors.facilityInfo?.[index]?.dateRanges?.[index],
            })}
            key={field.id}
          >
            <label htmlFor="startDate" className="sr-only">
              {pageContent.eventDuration} {index + 1}
            </label>
            <div className="flex items-center">
              {editModeFields[index] ? (
                <MobiScrollDatePicker
                  value={[field.startDate, field.endDate]}
                  defaultValue={[]}
                  name="startDate"
                  className="w-full"
                  index={index}
                  placeholderText={pageContent.chooseDuration}
                  dateOnChange={onEventDateChange}
                />
              ) : (
                <span className="w-full">
                  {formatDate(field.startDate)}
                  {" - "}
                  {formatDate(field.endDate)}
                </span>
              )}
              <Button
                variant={ButtonVariant.TRANSPARENT}
                className="p-0"
                title={
                  editModeFields[index]
                    ? pageContent.saveDuration
                    : pageContent.editDuration
                }
                onClick={() => {
                  setEditModeFields((prev) =>
                    prev.map((isEditable, idx) =>
                      idx === index ? !isEditable : isEditable,
                    ),
                  );
                }}
              >
                {editModeFields[index] ? (
                  <FaCheck size={20} className="ml-4 stroke-primary" />
                ) : (
                  <FaPencil size={20} className="ml-4 stroke-primary" />
                )}
              </Button>
              <Button
                variant={ButtonVariant.TRANSPARENT}
                className={cn("!border-none p-0", {
                  "opacity-60": fields.length <= 1,
                })}
                disabled={fields.length <= 1}
                title={pageContent.deleteDuration}
                onClick={() => deleteEventDuration(index)}
              >
                <FaRegTrashAlt size={20} className="ml-4 stroke-primary" />
              </Button>
            </div>
            {errors.facilityInfo?.[facilityIndex]?.dateRanges?.message && (
              <FormError
                id="startTime-error"
                errorMessage={t(
                  errors.facilityInfo?.[facilityIndex]?.dateRanges?.message ??
                    "",
                )}
              />
            )}
          </div>
        );
      })}

      {/*<div*/}
      {/*  className={cn(*/}
      {/*    "form-checkbox-group mt-6 flex items-center space-x-3",*/}
      {/*    {*/}
      {/*      "has-error": errors.repeatEvent,*/}
      {/*    },*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <Checkbox {...register("repeatEvent")} id="repeatEvent" />*/}
      {/*  <label htmlFor="repeatEvent" className="form-label">*/}
      {/*    {pageContent.repeatEvent}*/}
      {/*  </label>*/}
      {/*</div>*/}

      {/*<div*/}
      {/*  className={cn("form-group mt-4", {*/}
      {/*    "has-error": errors.repeatFrequency,*/}
      {/*  })}*/}
      {/*>*/}
      {/*  <p className="form-label flex gap-x-3">{pageContent.repeatLabel}</p>*/}
      {/*  <RadioGroup*/}
      {/*    className="lg-gap-y-0 flex flex-col items-start gap-y-4 lg:flex-row lg:items-baseline lg:gap-x-4"*/}
      {/*    name="repeatFrequency"*/}
      {/*    radioProps={[*/}
      {/*      {*/}
      {/*        value: EventRepeatFrequency.DAILY,*/}
      {/*        label: pageContent.daily,*/}
      {/*        checked:*/}
      {/*          watch("repeatFrequency") === EventRepeatFrequency.DAILY,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: EventRepeatFrequency.WEEKLY,*/}
      {/*        label: pageContent.weekly,*/}
      {/*        checked:*/}
      {/*          watch("repeatFrequency") === EventRepeatFrequency.WEEKLY,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: EventRepeatFrequency.MONTHLY,*/}
      {/*        label: pageContent.monthly,*/}
      {/*        checked:*/}
      {/*          watch("repeatFrequency") === EventRepeatFrequency.MONTHLY,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</div>*/}

      <Button
        className="mt-4 flex w-full cursor-pointer justify-center gap-x-2 rounded border-none bg-primary-25 py-4 pl-0 text-xl lg:w-auto"
        variant={ButtonVariant.SECONDARY}
        buttonType={ButtonType.BUTTON}
        onClick={addEventDuration}
        title={pageContent.addDuration}
        icon={
          <Icon
            src={<AddEventIcon />}
            alt={pageContent.addEventIconAltText}
            size={24}
          />
        }
      >
        {pageContent.addDuration}
      </Button>
    </>
  );
};

export default EventDates;
